package controller

import (
	"bytes"
	"context"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"runtime/debug"

	graphql "github.com/graph-gophers/graphql-go"

	sq "github.com/Masterminds/squirrel"
	"github.com/nfnt/resize"
	"github.com/spf13/viper"
	"github.com/zwzn/comicbox/comicboxd/app"
	"github.com/zwzn/comicbox/comicboxd/app/database"
	"github.com/zwzn/comicbox/comicboxd/app/schema"
	"github.com/zwzn/comicbox/comicboxd/cbz"
	"github.com/zwzn/comicbox/comicboxd/errors"
	"github.com/zwzn/comicbox/comicboxd/j"
	"github.com/zwzn/hidden"
	"golang.org/x/image/bmp"
)

type book struct{}

var Book = &book{}

func (b *book) Page(w http.ResponseWriter, r *http.Request) {
	c := app.Ctx(r)
	bookID := c.Var("id")
	pageNum := int(c.VarInt64("page"))

	book, err := schema.Query(r).Book(schema.BookArgs{ID: graphql.ID(bookID)})
	errors.Check(err)

	pages := book.Pages()
	if pageNum < 0 || pageNum >= len(pages) {
		c.Response = errors.HTTP(404)
		return
	}
	if _, err := os.Stat(book.File()); os.IsNotExist(err) {
		c.Response = fmt.Errorf("can't find file '%s'", book.File())
		return
	}

	imageFiles, err := cbz.ZippedImages(book.File())
	errors.Check(err)

	page := book.Pages()[pageNum]

	rc, err := imageFiles[page.FileNumber()].Open()
	if err != nil {
		c.Response = err
		return
	}
	defer rc.Close()

	// _, err = io.Copy(w, rc)
	// errors.Check(err)
	// return

	imgBytes, err := ioutil.ReadAll(rc)
	errors.Check(err)

	// c.Response = imgBytes
	mime := http.DetectContentType(imgBytes)
	var img image.Image
	if mime == "image/jpeg" {
		img, err = jpeg.Decode(bytes.NewReader(imgBytes))
	} else if mime == "image/png" {
		img, err = png.Decode(bytes.NewReader(imgBytes))
	} else {
		err = fmt.Errorf("Unsupported file type: %s", mime)
	}
	if err != nil {
		c.Response = err
		return
	}

	if height, ok := c.QGetInt64("height"); ok {
		img = resize.Resize(uint(height), 0, img, resize.Lanczos3)
	}
	quality, ok := c.QGetInt64("quality")
	if !ok {
		quality = 30
	}

	switch c.Var("ext") {
	case "jpg":
		err = jpeg.Encode(w, img, &jpeg.Options{
			Quality: int(quality),
		})
		errors.Check(err)
		// w.Header().Set("Content-Type", "image/jpeg")
	case "png":
		err = png.Encode(w, img)
		errors.Check(err)
		// w.Header().Set("Content-Type", "image/png")
	case "bmp":
		err = bmp.Encode(w, img)
		errors.Check(err)
		// w.Header().Set("Content-Type", "image/bmp")
	}
}

func (b *book) Scan(w http.ResponseWriter, r *http.Request) {
	go scan(r)
}

func scan(r *http.Request) {
	defer (func() {
		if err := recover(); err != nil {
			j.Errorf("error scanning books: %s\n%s", err, debug.Stack())
			Push.Error("error scanning books: %s", err)
		}
	})()

	Push.Message("Starting book scan")
	dbFiles := []string{}

	sql, args, err := sq.Select("file").From("book").OrderBy("file").ToSql()
	errors.Check(err)

	err = database.Select(&dbFiles, sql, args...)
	errors.Check(err)

	realFiles := []string{}
	err = filepath.Walk(viper.GetString("dir"), func(path string, info os.FileInfo, err error) error {
		if info == nil {
			return fmt.Errorf("the scan path does not exist")
		}

		if h, _ := hidden.IsHidden(path); h {
			return nil
		}

		ext := filepath.Ext(path)
		if info.IsDir() || (ext != ".cbz" && ext != ".zip") {
			return nil
		}
		realFiles = append(realFiles, path)
		return nil
	})
	if err != nil {
		panic(fmt.Errorf("error walking files %v", err))
	}

	addFiles, removeFiles := DiffSlice(realFiles, dbFiles)

	Push.Message("Started Add")

	q := schema.QueryCtx(r, context.Background())
	addFilesLen := len(addFiles)
	removeFilesLen := len(removeFiles)
	for i, path := range addFiles {
		if i%100 == 0 {
			Push.Message("Done %.0f%%", float64(i)/float64(addFilesLen+removeFilesLen)*100.0)
		}

		args := schema.NewBookArgs{}
		args.Data.File = &path
		_, err := q.NewBook(args)
		if err != nil {
			j.Warningf("error adding file '%s': %v", path, err)
		}
	}
	i := 0
	for _, path := range removeFiles {
		i++
		if i%100 == 0 {
			Push.Message("Done %.0f%%", float64(i)/float64(addFilesLen+removeFilesLen)*100.0)
		}
		ids := []string{}

		sql, args, err := sq.Select("id").From("book").Where(sq.Eq{"file": path}).ToSql()
		errors.Check(err)

		err = database.Select(&ids, sql, args...)
		errors.Check(err)

		for _, id := range ids {
			_, err := q.DeleteBook(schema.DeleteBookArgs{ID: graphql.ID(id)})
			if err != nil {
				j.Warningf("error adding file '%s': %v", path, err)
			}
		}
	}

	Push.Message("Finished book scan")
}

func DiffSlice(a, b []string) ([]string, []string) {
	aMap := map[string]struct{}{}

	onlyA := make([]string, 0, len(a))
	onlyB := make([]string, 0, len(b))

	for _, str := range a {
		aMap[str] = struct{}{}
	}

	for _, str := range b {
		if _, ok := aMap[str]; ok {
			delete(aMap, str)
		} else {
			onlyB = append(onlyB, str)
		}
	}

	for str := range aMap {
		onlyA = append(onlyA, str)
	}

	return onlyA, onlyB
}
