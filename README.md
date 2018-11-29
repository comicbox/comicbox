# ComicBox

ComicBox is a web based comic reader.

## Setup

Building this project requires the following:
 * [go](https://golang.org/)
 * [Cordova](https://cordova.apache.org/)
 * [go-bindata](https://github.com/zwzn/go-bindata)
 * [Android Studio](https://developer.android.com/studio/) - if you'd like to build the frontend into an app.

Each of these dependencies can be installed in their own way depending on platform, follow the instructions that match your environment.

For `go-bindata`, run the command `go install github.com/zwzn/go-bindata/go-bindata`. -- *Is this correct?*


1. Clone the repository to `$GOPATH/src/github.com/abibby/comicbox`
```
$ git clone git@github.com:abibby/comicbox.git $(go env GOPATH)/src/github.com/abibby/comicbox
$ cd $(go env GOPATH)/src/github.com/abibby/comicbox
```

3. Get the `go` dependencies
```
$ go get ./...
```
