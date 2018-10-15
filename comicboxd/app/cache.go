package app

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

var NotCached = fmt.Errorf("request not cached")
var cachePath = "./.cache"

func Cache(w http.ResponseWriter, r *http.Request) (http.ResponseWriter, error) {
	file := filepath.Join(cachePath, r.RequestURI)
	if _, err := os.Stat(file); err == nil {
		f, err := os.OpenFile(file, os.O_RDONLY, 0777)
		if err != nil {
			return w, err
		}

		io.Copy(w, f)
		return w, nil
	}

	dir := filepath.Dir(file)
	err := os.MkdirAll(dir, 0777)
	if err != nil {
		return w, err
	}

	f, err := os.OpenFile(file, os.O_CREATE|os.O_RDWR, 0777)
	if err != nil {
		return w, err
	}
	rw := NewResponseWriter(w)
	go func() {
		time.Sleep(time.Second)
		f.Write(rw.data)
		f.Close()
		// io.Copy()
	}()
	return rw, NotCached
}
func loadCache(path string) error {
	// f, err := os.Open(file)
	// if err != nil {
	// 	return err
	// }
	return nil

}

type ResponseWriter struct {
	w      http.ResponseWriter
	data   []byte
	status int
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
