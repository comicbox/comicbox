package controller

import (
	"bytes"
	"context"
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"runtime/debug"

	graphql "github.com/graph-gophers/graphql-go"

	sq "github.com/Masterminds/squirrel"
	"github.com/comicbox/comicbox/comicboxd/app"
	"github.com/comicbox/comicbox/comicboxd/app/database"
	"github.com/comicbox/comicbox/comicboxd/app/schema"
	"github.com/comicbox/comicbox/comicboxd/cbz"
	"github.com/comicbox/comicbox/comicboxd/errors"
	"github.com/comicbox/comicbox/comicboxd/j"
	"github.com/nfnt/resize"
	"github.com/spf13/viper"
	"github.com/zwzn/hidden"
	"golang.org/x/image/bmp"
	"golang.org/x/image/tiff"
	"golang.org/x/image/webp"
)

type book struct{}

var Book = &book{}

func (b *book) Page(w http.ResponseWriter, r *http.Request) {
	c := app.Ctx(r)
	bookID := c.Var("id")
	pageNum := int(c.VarInt64("page"))

	book, err := schema.Query(r).Book(schema.BookArgs{ID: graphql.ID(bookID)})
	errors.Check(err)

	if book == nil {
		c.Response = errors.HTTP(404)
		return
	}

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

	img, err := DecodeImage(rc)
	if err != nil {
		c.Response = err
		return
	}

	if height, ok := c.QGetInt64("height"); ok {
		img = resize.Resize(uint(height), 0, img, resize.Lanczos3)
	}
	quality, ok := c.QGetInt64("quality")
	if !ok {
		quality = 90
	}

	switch c.Var("ext") {
	case "jpg":
		err = jpeg.Encode(w, img, &jpeg.Options{
			Quality: int(quality),
		})
	case "png":
		err = png.Encode(w, img)
	case "bmp":
		err = bmp.Encode(w, img)
	}
	if r.Context().Err() != context.Canceled {
		errors.Check(err)
	}
}

func DecodeImage(r io.Reader) (image.Image, error) {
	imgBytes, err := ioutil.ReadAll(r)
	if err != nil {
		return nil, err
	}
	mime := http.DetectContentType(imgBytes)
	if mime == "image/jpeg" {
		return jpeg.Decode(bytes.NewReader(imgBytes))
	} else if mime == "image/png" {
		return png.Decode(bytes.NewReader(imgBytes))
	} else if mime == "image/gif" {
		return gif.Decode(bytes.NewReader(imgBytes))
	} else if mime == "image/webp" {
		return webp.Decode(bytes.NewReader(imgBytes))
	} else if mime == "image/tiff" {
		return tiff.Decode(bytes.NewReader(imgBytes))
	} else if mime == "image/bmp" {
		return bmp.Decode(bytes.NewReader(imgBytes))
	} else {
		return nil, fmt.Errorf("Unsupported file type: %s", mime)
	}
}

func (b *book) Scan(w http.ResponseWriter, r *http.Request) {
	c := app.Ctx(r)
	if c.Guest() {
		c.Response = errors.HTTP(401)
		return
	}
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
