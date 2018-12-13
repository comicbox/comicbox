package schema

import (
	"archive/zip"
	"context"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"path/filepath"
	"reflect"
	"regexp"
	"strconv"
	"strings"

	"github.com/zwzn/comicbox/comicboxd/app/controller"
	"github.com/zwzn/comicbox/comicboxd/app/schema/comicrack"

	"github.com/google/uuid"
	"github.com/zwzn/comicbox/comicboxd/app/database"

	"github.com/Masterminds/squirrel"
	graphql "github.com/graph-gophers/graphql-go"

	"github.com/zwzn/comicbox/comicboxd/app/model"
)

type bookInput struct {
	Chapter          *float64      `db:"chapter"`
	Summary          *string       `db:"summary"`
	Series           *string       `db:"series"`
	DateReleased     *graphql.Time `db:"date_released"`
	AlternateSeries  *string       `db:"alternate_series"`
	ReadingDirection *string       `db:"reading_direction"`
	File             *string       `db:"file"`
	Authors          *[]string     `db:"authors"`
	StoryArc         *string       `db:"story_arc"`
	Volume           *int32        `db:"volume"`
	CommunityRating  *float64      `db:"community_rating"`
	Type             *string       `db:"type"`
	Web              *string       `db:"web"`
	Genres           *[]string     `db:"genres"`
	Title            *string       `db:"title"`
	Pages            *[]pageInput  `db:"pages"`
}

type userBookInput struct {
	LastPageRead *int32   `db:"last_page_read"`
	CurrentPage  *int32   `db:"current_page"`
	Rating       *float64 `db:"rating"`
}

type bookUserBookInput struct {
	bookInput
	userBookInput
}

type pageInput struct {
	URL        *string
	FileNumber *int32
	Type       *string
}

type newBookArgs struct {
	Book bookUserBookInput
}

func (q *query) NewBook(ctx context.Context, args newBookArgs) (*BookResolver, error) {
	// c := q.Ctx(ctx)\
	newID := uuid.New().String()

	book := toStruct(args.Book.bookInput)
	book, err := loadNewBookData(book)
	if err != nil {
		return nil, fmt.Errorf("NewBook loadNewBookData: %v", err)
	}
	book["id"] = newID

	pages, ok := book["pages"].([]interface{})
	if !ok {
		return nil, fmt.Errorf("no pages")
	}
	book["page_count"] = len(pages)
	book, err = makeJSON(book)
	if err != nil {
		return nil, fmt.Errorf("NewBook makeJSON: %v", err)
	}

	query := insert(book, squirrel.Insert("book"))
	qSQL, qArgs, err := query.ToSql()
	if err != nil {
		return nil, err
	}
	// fmt.Printf("%#v\n", qArgs)
	_, err = database.Exec(qSQL, qArgs...)
	if err != nil {
		return nil, fmt.Errorf("NewBook exec: %v", err)
	}

	return q.Book(ctx, bookArgs{ID: graphql.ID(newID)})
}

type updateBookArgs struct {
	ID   graphql.ID
	Book bookUserBookInput
}

func (q *query) UpdateBook(ctx context.Context, args updateBookArgs) (*BookResolver, error) {
	c := q.Ctx(ctx)
	updateBook(args.ID, args.Book.bookInput)
	updateUserBook(args.ID, graphql.ID(c.User.ID.String()), args.Book.userBookInput)
	return q.Book(ctx, bookArgs{ID: args.ID})
}

func updateBook(id graphql.ID, book bookInput) error {
	m := toStruct(book)
	query := squirrel.Update("book").Where(squirrel.Eq{"id": id})
	query = update(m, query)
	qSQL, qArgs, err := query.ToSql()
	if err != nil {
		return err
	}

	_, err = database.Exec(qSQL, qArgs...)
	if err != nil {
		return fmt.Errorf("updateBook exec: %v", err)
	}
	return nil
}

func updateUserBook(bookID, userID graphql.ID, book userBookInput) error {
	m := toStruct(book)
	query := squirrel.Update("user_book").
		Where(squirrel.Eq{"book_id": bookID}).
		Where(squirrel.Eq{"user_id": userID})
	query = update(m, query)
	qSQL, qArgs, err := query.ToSql()
	if err != nil {
		return err
	}

	_, err = database.Exec(qSQL, qArgs...)
	if err != nil {
		return fmt.Errorf("updateUserBook exec: %v", err)
	}
	return nil
}

func loadNewBookData(bookMap map[string]interface{}) (map[string]interface{}, error) {
	iFile, ok := bookMap["file"]
	if !ok {
		return nil, fmt.Errorf("you must have a file in new books")
	}
	file := iFile.(string)

	newBookMap := map[string]interface{}{}

	imgs, err := controller.ZippedImages(file)
	if err != nil {
		return nil, err
	}

	if _, ok := newBookMap["pages"]; !ok {
		numPages := len(imgs)
		tmpPages := make([]interface{}, numPages)
		for i := 0; i < numPages; i++ {
			typ := controller.Story
			if i == 0 {
				typ = controller.Cover
			}
			tmpPages[i] = &model.Page{
				FileNumber: int32(i),
				Type:       typ,
			}
		}
		newBookMap["pages"] = tmpPages
	}

	reader, err := zip.OpenReader(file)
	if err != nil {
		return nil, err
	}

	fNameBookMap, err := parseFileName(file)
	if err != nil {
		return nil, err
	}
	for key, val := range fNameBookMap {
		newBookMap[key] = val
	}
	for _, f := range reader.File {
		name := f.FileInfo().Name()
		if name == "book.json" {
			ciBookMap, err := parseBookJSON(f)
			if err != nil {
				return nil, err
			}
			for key, val := range ciBookMap {
				newBookMap[key] = val
			}
		} else if name == "ComicInfo.xml" {
			ciBookMap, err := parseComicInfoXML(f)
			if err != nil {
				return nil, err
			}
			for key, val := range ciBookMap {
				newBookMap[key] = val
			}
		}
	}
	for key, val := range bookMap {
		newBookMap[key] = val
	}

	return newBookMap, nil
}

func fileBytes(f *zip.File) ([]byte, error) {
	reader, err := f.Open()
	if err != nil {
		return nil, err
	}
	defer reader.Close()

	b, err := ioutil.ReadAll(reader)
	if err != nil {
		return nil, err
	}
	return b, nil
}

func parseFileName(path string) (map[string]interface{}, error) {
	bookMap := map[string]interface{}{}
	extension := filepath.Ext(path)
	name := filepath.Base(path[:len(path)-len(extension)])
	dir := filepath.Base(filepath.Dir(path))

	bookMap["series"] = dir

	if strings.HasPrefix(name, dir) {
		name = name[len(dir):]
	}
	hasInfo := false

	matches := regexp.
		MustCompile(`^(?P<volume>[vV][\d]+(\.[\d]+)?)? *(#?(?P<chapter>[\d]+(\.[\d]+)?))? *(-)? *(?P<title>.*)$`).
		FindStringSubmatch(strings.Replace(name, "_", " ", -1))

	chapter, err := strconv.ParseFloat(matches[4], 64)
	if err == nil {
		hasInfo = true
		bookMap["chapter"] = chapter
	}
	volume, err := strconv.ParseFloat(matches[1], 64)
	if err == nil {
		hasInfo = true
		bookMap["volume"] = volume
	}
	if matches[7] != "" {
		hasInfo = true
		bookMap["title"] = matches[7]
	}

	if !hasInfo {
		bookMap["title"] = name
	}

	return bookMap, nil
}

func parseBookJSON(f *zip.File) (map[string]interface{}, error) {
	book := struct {
		model.Book
		Author string  `json:"author"`
		Number float64 `json:"number"`
	}{}
	b, err := fileBytes(f)
	if err != nil {
		return nil, err
	}

	err = json.Unmarshal(b, &book)
	if err != nil {
		return nil, fmt.Errorf("parsing book.json: %v", err)
	}

	if book.Author != "" {
		if book.Authors == nil {
			book.Authors = []string{}
		}
		book.Authors = append(book.Authors, book.Author)
	}
	// if author, ok := book["author"]; ok {
	// 	book["authors"] = []interface{}{author}
	// }
	if book.Chapter == nil {
		book.Chapter = &book.Number
	}
	// if number, ok := bookMap["number"]; ok {
	// 	bookMap["chapter"] = number
	// }

	if len(book.Pages) > 0 {
		allZero := true
		for _, page := range book.Pages {
			if page.FileNumber != 0 {
				allZero = false
			}
		}
		if allZero {
			for i := range book.Pages {
				book.Pages[i].FileNumber = int32(i)
			}
		}
	} else {
		book.Pages = nil
	}
	bookMap := toMap(book)

	delete(bookMap, "author")
	delete(bookMap, "number")

	for key, value := range bookMap {
		if IsZero(value) {
			delete(bookMap, key)
		}
	}
	return bookMap, nil
}

func toMap(in interface{}) map[string]interface{} {
	b, err := json.Marshal(in)
	if err != nil {
		return nil
	}
	outMap := map[string]interface{}{}
	json.Unmarshal(b, &outMap)
	return outMap
}

// from https://stackoverflow.com/a/33116479
func IsZero(v interface{}) bool {
	if v == nil {
		return true
	}
	t := reflect.TypeOf(v)
	if !t.Comparable() {
		return false
	}
	return v == reflect.Zero(t).Interface()
}

func parseComicInfoXML(f *zip.File) (map[string]interface{}, error) {
	bookMap := map[string]interface{}{}
	b, err := fileBytes(f)
	if err != nil {
		return nil, err
	}

	crBook := comicrack.Book{}
	err = xml.Unmarshal(b, &crBook)
	if err != nil {
		return nil, err
	}
	if crBook.Number != 0 {
		bookMap["chapter"] = crBook.Number
	}
	if crBook.Volume != 0 {
		bookMap["volume"] = crBook.Volume
	}
	if crBook.Series != "" {
		bookMap["series"] = crBook.Series
	}
	if crBook.Writer != "" {
		bookMap["authors"] = strings.Split(crBook.Writer, ", ")
	}
	if crBook.Genres != "" {
		bookMap["genres"] = strings.Split(crBook.Genres, ", ")
	}
	if crBook.Summary != "" {
		bookMap["summary"] = crBook.Summary
	}
	if crBook.Title != "" {
		bookMap["title"] = crBook.Title
	}

	if numPages := len(crBook.Pages); numPages != 0 {
		tmpPages := make([]interface{}, numPages)
		for i := 0; i < numPages; i++ {
			var typ string
			switch crBook.Pages[i].Type {
			case "FrontCover":
				typ = controller.Cover
			case "Story":
				typ = controller.Story
			case "Deleted":
				typ = controller.Deleted
			default:
				typ = controller.Story
			}
			img := i
			if crBook.Pages[i].Image != nil {
				img = *crBook.Pages[i].Image
			}
			tmpPages[i] = &model.Page{
				FileNumber: int32(img),
				Type:       typ,
			}
		}
		bookMap["pages"] = tmpPages
	}
	for key, value := range bookMap {
		if IsZero(value) {
			delete(bookMap, key)
		}
	}

	return bookMap, nil
}
