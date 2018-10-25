package middleware

import (
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/abibby/comicbox/comicboxd/errors"
)

var cachePath = "./.cache"

func Cache(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		file := filepath.Join(cachePath, r.RequestURI)
		if _, err := os.Stat(file); err == nil {
			f, err := os.OpenFile(file, os.O_RDONLY, 0777)
			errors.Check(err)

			io.Copy(w, f)
			return
		}

		rw := NewResponseWriter(w)

		next.ServeHTTP(rw, r)

		rw.header = w.Header()

		if rw.status < 200 || rw.status > 299 {
			return
		}

		dir := filepath.Dir(file)
		err := os.MkdirAll(dir, 0777)
		errors.Check(err)

		f, err := os.OpenFile(file, os.O_CREATE|os.O_RDWR, 0777)
		errors.Check(err)

		f.Write(rw.data)
		f.Close()

	})
}

type ResponseWriter struct {
	w      http.ResponseWriter
	data   []byte
	status int
	header http.Header
}

func NewResponseWriter(w http.ResponseWriter) *ResponseWriter {
	return &ResponseWriter{
		w:      w,
		data:   []byte{},
		status: 200,
	}
}
func (rw *ResponseWriter) Header() http.Header {
	return rw.w.Header()
}
func (rw *ResponseWriter) Write(b []byte) (int, error) {
	rw.data = append(rw.data, b...)
	return rw.w.Write(b)
}
func (rw *ResponseWriter) WriteHeader(statusCode int) {
	rw.status = statusCode
	rw.w.WriteHeader(statusCode)
}
