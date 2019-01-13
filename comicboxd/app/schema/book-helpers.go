package schema

import (
	"archive/zip"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"

	"github.com/imdario/mergo"

	"github.com/Masterminds/squirrel"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/jmoiron/sqlx"
	"github.com/comicbox/comicbox/comicboxd/app/schema/comicrack"
	"github.com/comicbox/comicbox/comicboxd/cbz"
)

func updateBook(tx *sqlx.Tx, id graphql.ID, book BookInput) error {
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

func updateUserBook(tx *sqlx.Tx, bookID, userID graphql.ID, book UserBookInput) error {
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

func loadNewBookData(book BookUserBookInput) (BookUserBookInput, error) {
	if book.File == nil {
		return BookUserBookInput{}, fmt.Errorf("you must have a file in new books")
	}
	file := *book.File
	imgs, err := cbz.ZippedImages(file)
	if err != nil {
		return BookUserBookInput{}, err
	}

	if book.Pages == nil {
		numPages := int32(len(imgs))
		tmpPages := make([]pageInput, numPages)
		for i := int32(0); i < numPages; i++ {
			typ := "Story"
			if i == 0 {
				typ = "FrontCover"
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
		return BookUserBookInput{}, err
	}

	newBook := parseFileName(file)
	if err != nil {
		return BookUserBookInput{}, err
	}

	err = mergo.Merge(&book, newBook, mergo.WithOverride)
	if err != nil {
		return BookUserBookInput{}, err
	}

	for _, f := range reader.File {
		name := f.FileInfo().Name()
		if name == "book.json" {
			newBook, err := parseBookJSON(f)
			if err != nil {
				return BookUserBookInput{}, err
			}

			err = mergo.Merge(&book, newBook, mergo.WithOverride)
			if err != nil {
				return BookUserBookInput{}, err
			}

		} else if name == "ComicInfo.xml" {
			newBook, err := parseComicInfoXML(f)
			if err != nil {
				return BookUserBookInput{}, err
			}

			err = mergo.Merge(&book, newBook, mergo.WithOverride)
			if err != nil {
				return BookUserBookInput{}, err
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

func parseFileName(path string) BookUserBookInput {
	book := BookUserBookInput{}
	extension := filepath.Ext(path)
	name := filepath.Base(path[:len(path)-len(extension)])
	dir := filepath.Base(filepath.Dir(path))

	book.Series = &dir

	if strings.HasPrefix(name, dir) {
		name = name[len(dir):]
	}
	exp := regexp.MustCompile(`^([vV](?P<volume>[\d]+))? *(#?(?P<chapter>[\d]+(\.[\d]+)?))? *(-)? *(?P<title>.*)$`)
	matches := exp.FindStringSubmatch(strings.TrimSpace(strings.Replace(name, "_", " ", -1)))

	result := make(map[string]string)
	for i, name := range exp.SubexpNames() {
		if i != 0 && name != "" {
			result[name] = matches[i]
		}
	}

	chapter, err := strconv.ParseFloat(result["chapter"], 64)
	if err == nil {
		book.Chapter = &chapter
	}
	volume64, err := strconv.ParseInt(result["volume"], 10, 64)
	if err == nil {
		volume := int32(volume64)
		book.Volume = &volume
	}
	if result["title"] != "" {
		title := result["title"]
		book.Title = &title
	}
	return book
}

func parseBookJSON(f *zip.File) (BookUserBookInput, error) {
	type comboBook struct {
		BookUserBookInput
		Author string  `json:"author"`
		Number float64 `json:"number"`
	}

	b, err := fileBytes(f)
	if err != nil {
		return BookUserBookInput{}, err
	}
	tmpBook := comboBook{}
	err = json.Unmarshal(b, &tmpBook)
	if err != nil {
		return BookUserBookInput{}, fmt.Errorf("parsing book.json: %v", err)
	}

	if tmpBook.Author != "" {
		if tmpBook.Authors == nil {
			tmpBook.Authors = &[]string{}
		}
		authors := append(*tmpBook.Authors, tmpBook.Author)
		tmpBook.Authors = &authors
	}

	if tmpBook.Chapter == nil {
		tmpBook.Chapter = &tmpBook.Number
	}

	if tmpBook.Pages != nil && len(*tmpBook.Pages) > 0 {
		allZero := true
		for _, page := range *tmpBook.Pages {
			if page.FileNumber != 0 {
				allZero = false
			}
		}
		if allZero {
			for i := range *tmpBook.Pages {
				(*tmpBook.Pages)[i].FileNumber = int32(i)
			}
		}
	}
	tmpBook.File = nil
	return tmpBook.BookUserBookInput, nil
}

func parseComicInfoXML(f *zip.File) (BookUserBookInput, error) {
	book := BookUserBookInput{}
	b, err := fileBytes(f)
	if err != nil {
		return book, err
	}

	crBook := comicrack.Book{}
	err = xml.Unmarshal(b, &crBook)
	if err != nil {
		return book, err
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
				typ = "FrontCover"
			case "Story":
				typ = "Story"
			case "Deleted":
				typ = "Deleted"
			default:
				typ = "Story"
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

	return book, nil
}
