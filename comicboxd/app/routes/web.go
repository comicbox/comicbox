package routes

import (
	"archive/zip"
	"bytes"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"io/ioutil"
	"net/http"
	"os"
	"sort"
	"strings"

	"bitbucket.org/zwzn/comicbox/comicboxd/app"
	"bitbucket.org/zwzn/comicbox/comicboxd/app/model"
	"bitbucket.org/zwzn/comicbox/comicboxd/data"
	"bitbucket.org/zwzn/comicbox/comicboxd/errors"
	"bitbucket.org/zwzn/comicbox/comicboxd/server"
	assetfs "github.com/elazarl/go-bindata-assetfs"
	"github.com/nfnt/resize"
)

type obj = map[string]interface{}

func Web(s *server.Server) {

	GraphQL(s)

	s.Router.HandleFunc("/api/v1/book/{id:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}}/page/{page:[0-9]+}.{ext:(?:jpg|png)}", func(w http.ResponseWriter, r *http.Request) {
		c := app.Ctx(r)
		bookID := c.Var("id")
		pageNum := int(c.VarInt64("page"))
		book := model.BookUserBook{}
		err := Query(`query getBook($id:ID!) {
			book(id: $id){
				file
				pages {
					file_number
					type
				}
			}
		}`, obj{"id": bookID}, &book)
		errors.Check(err)

		pages := book.Pages
		if pageNum < 0 || pageNum >= len(pages) {
			c.Response = errors.HTTP(404)
			return
		}
		if _, err := os.Stat(book.File); os.IsNotExist(err) {
			c.Response = fmt.Errorf("can't find file '%s'", book.File)
			return
		}

		// Open a zip archive for reading.
		reader, err := zip.OpenReader(book.File)
		if err != nil {
			c.Response = fmt.Errorf("error opening zip: %v", err)
			return
		}

		sort.Slice(reader.File, func(i, j int) bool {
			return strings.Compare(reader.File[i].Name, reader.File[j].Name) < 0
		})

		imageFiles := reader.File[:0]
		for _, x := range reader.File {
			lowerName := strings.ToLower(x.Name)
			if strings.HasSuffix(lowerName, ".jpg") ||
				strings.HasSuffix(lowerName, ".jpeg") ||
				strings.HasSuffix(lowerName, ".png") ||
				strings.HasSuffix(lowerName, ".bmp") ||
				strings.HasSuffix(lowerName, ".tiff") {
				imageFiles = append(imageFiles, x)
			}
		}

		page := book.Pages[pageNum]

		rc, err := imageFiles[page.FileNumber].Open()
		if err != nil {
			c.Response = err
			return
		}
		defer rc.Close()
		imgBytes, err := ioutil.ReadAll(rc)
		errors.Check(err)

		c.Response = imgBytes
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
			jpeg.Encode(w, img, &jpeg.Options{
				Quality: int(quality),
			})
			// w.Header().Set("Content-Type", "image/jpeg")
		case "png":
			png.Encode(w, img)
			// w.Header().Set("Content-Type", "image/png")
		}

	})

	s.Router.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(&assetfs.AssetFS{
		Asset:     data.Asset,
		AssetDir:  data.AssetDir,
		AssetInfo: data.AssetInfo,
		Prefix:    "web/dist",
	})))

	s.Router.Methods("GET").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		d, err := data.Asset("web/dist/index.html")
		errors.Check(err)
		_, err = w.Write(d)
		errors.Check(err)
	})

}
