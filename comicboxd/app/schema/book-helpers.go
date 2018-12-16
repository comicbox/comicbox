package schema

import (
	"archive/zip"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"path/filepath"
	"reflect"
	"regexp"
	"strconv"
	"strings"

	"github.com/Masterminds/squirrel"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/jmoiron/sqlx"
	"github.com/zwzn/comicbox/comicboxd/app/controller"
	"github.com/zwzn/comicbox/comicboxd/app/schema/comicrack"
)

func updateBook(tx *sqlx.Tx, id graphql.ID, book bookInput) error {
	m := toStruct(book)
	if len(m) == 0 {
		return nil
	}
	m, err := makeJSON(m)
	if err != nil {
		return err
	}

	if book.Pages != nil {
		m["page_count"] = len(*book.Pages)
	}

	query := squirrel.Update("book").Where(squirrel.Eq{"id": id})
	query = update(m, query)
	_, err = query.RunWith(tx).Exec()
	if err != nil {
		return fmt.Errorf("updateBook exec: %v", err)
	}

	return nil
}

func updateUserBook(tx *sqlx.Tx, bookID, userID graphql.ID, book userBookInput) error {
	m := toStruct(book)
	if len(m) == 0 {
		return nil
	}
	m, err := makeJSON(m)
	if err != nil {
		return err
	}

	_, err = tx.Exec("INSERT OR IGNORE INTO user_book (book_id, user_id) VALUES (?, ?)", bookID, userID)
	if err != nil {
		return fmt.Errorf("updateBook exec: %v", err)
	}
	query := squirrel.Update("user_book").
		Where(squirrel.Eq{"book_id": bookID}).
		Where(squirrel.Eq{"user_id": userID})
	query = update(m, query)
	_, err = query.RunWith(tx).Exec()
	if err != nil {
		return fmt.Errorf("updateUserBook exec: %v", err)
	}
	return nil
}

func loadNewBookData(book bookUserBookInput) (bookUserBookInput, error) {
	if book.File == nil {
		return bookUserBookInput{}, fmt.Errorf("you must have a file in new books")
	}
	file := *book.File
	imgs, err := controller.ZippedImages(file)
	if err != nil {
		return bookUserBookInput{}, err
	}

	if book.Pages == nil {
		numPages := int32(len(imgs))
		tmpPages := make([]pageInput, numPages)
		for i := int32(0); i < numPages; i++ {
			typ := controller.Story
			if i == 0 {
				typ = controller.Cover
			}
			tmpPages[i] = pageInput{
				FileNumber: i,
				Type:       typ,
			}
		}
		book.Pages = &tmpPages
	}

	reader, err := zip.OpenReader(file)
	if err != nil {
		return bookUserBookInput{}, err
	}

	err = parseFileName(&book)
	if err != nil {
		return bookUserBookInput{}, err
	}

	for _, f := range reader.File {
		name := f.FileInfo().Name()
		if name == "book.json" {
			err = parseBookJSON(&book, f)
			if err != nil {
				return bookUserBookInput{}, err
			}
		} else if name == "ComicInfo.xml" {
			err = parseComicInfoXML(&book, f)
			if err != nil {
				return bookUserBookInput{}, err
			}
		}
	}

	return book, nil
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

func parseFileName(book *bookUserBookInput) error {
	path := *book.File

	extension := filepath.Ext(path)
	name := filepath.Base(path[:len(path)-len(extension)])
	dir := filepath.Base(filepath.Dir(path))

	book.Series = &dir

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
		book.Chapter = &chapter
	}
	volume64, err := strconv.ParseInt(matches[1], 10, 64)
	if err == nil {
		volume := int32(volume64)
		hasInfo = true
		book.Volume = &volume
	}
	if matches[7] != "" {
		hasInfo = true
		book.Title = &matches[7]
	}

	if !hasInfo {
		book.Title = &name
	}

	return nil
}

func parseBookJSON(bookInput *bookUserBookInput, f *zip.File) error {
	book := struct {
		*bookUserBookInput
		Author string  `json:"author"`
		Number float64 `json:"number"`
	}{}

	book.bookUserBookInput = bookInput
	b, err := fileBytes(f)
	if err != nil {
		return err
	}

	err = json.Unmarshal(b, &book)
	if err != nil {
		return fmt.Errorf("parsing book.json: %v", err)
	}

	if book.Author != "" {
		if book.Authors == nil {
			book.Authors = &[]string{}
		}
		authors := append(*book.Authors, book.Author)
		book.Authors = &authors
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

	if len(*book.Pages) > 0 {
		allZero := true
		for _, page := range *book.Pages {
			if page.FileNumber != 0 {
				allZero = false
			}
		}
		if allZero {
			for i := range *book.Pages {
				(*book.Pages)[i].FileNumber = int32(i)
			}
		}
	}

	return nil
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

func parseComicInfoXML(book *bookUserBookInput, f *zip.File) error {
	b, err := fileBytes(f)
	if err != nil {
		return err
	}

	crBook := comicrack.Book{}
	err = xml.Unmarshal(b, &crBook)
	if err != nil {
		return err
	}

	book.Chapter = crBook.Number
	book.Volume = crBook.Volume
	book.Series = crBook.Series
	book.Summary = crBook.Summary
	book.Title = crBook.Title

	if crBook.Writer != nil {
		authors := strings.Split(*crBook.Writer, ", ")
		book.Authors = &authors
	}
	if crBook.Genres != nil {
		genres := strings.Split(*crBook.Genres, ", ")
		book.Genres = &genres
	}

	if numPages := len(crBook.Pages); numPages != 0 {
		tmpPages := make([]pageInput, numPages)
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
			img := int32(i)
			if crBook.Pages[i].Image != nil {
				img = *crBook.Pages[i].Image
			}
			tmpPages[i].FileNumber = img
			tmpPages[i].Type = typ
		}
		book.Pages = &tmpPages
	}

	return nil
}
