# ComicBox

ComicBox is a web based comic reader.

## Setup

Building this project requires [go](https://golang.org/) and [Cordova](https://cordova.apache.org/), and optionally [Android Studio](https://developer.android.com/studio/) if you'd like to build the frontend into an app.

1. Clone the repository to `$GOPATH/src/github.com/abibby/comicbox`
```
$ git clone git@github.com:abibby/comicbox.git $(go env GOPATH)/src/github.com/abibby/comicbox
$ cd $(go env GOPATH)/src/github.com/abibby/comicbox
```

2. Get the `go` dependencies
```
$ go get ./...
```
