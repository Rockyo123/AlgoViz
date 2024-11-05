package main

import (
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {
	var port int
	flag.IntVar(&port, "port", 8080, "The port to listen on")
	flag.Parse()
	var frontend fs.FS = os.DirFS("./frontend/dist")
	httpFS := http.FS(frontend)
	fileServer := http.FileServer(httpFS)
	serveIndex := serveFileContents("index.html", httpFS)
	http.Handle("/", intercept404(fileServer, serveIndex))

	// Start the web server
	addr := fmt.Sprintf("localhost:%d", port)
	log.Fatalln(http.ListenAndServe(addr, nil))
}

func intercept404(handler, on404 http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		hookedWriter := &hookedResponseWriter{ResponseWriter: w}
		handler.ServeHTTP(hookedWriter, r)

		if hookedWriter.got404 {
			on404.ServeHTTP(w, r)
		}
	})
}

type hookedResponseWriter struct {
	http.ResponseWriter
	got404 bool
}

func (hrw *hookedResponseWriter) WriteHeader(status int) {
	if status == http.StatusNotFound {
		hrw.got404 = true
	} else {
		hrw.ResponseWriter.WriteHeader(status)
	}
}

func (hrw *hookedResponseWriter) Write(p []byte) (int, error) {
	if hrw.got404 {
		return len(p), nil
	}

	return hrw.ResponseWriter.Write(p)
}

func serveFileContents(file string, files http.FileSystem) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if !strings.Contains(r.Header.Get("Accept"), "text/html") {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		index, err := files.Open(file)
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		fi, err := index.Stat()
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		http.ServeContent(w, r, fi.Name(), fi.ModTime(), index)
	}
}
