# ComicBox

ComicBox is a web based comic reader.

## Setup

Building this project requires the following:
 * [go](https://golang.org/)
 * [Cordova](https://cordova.apache.org/)
 * [go-bindata](https://github.com/zwzn/go-bindata)
 * [Android Studio](https://developer.android.com/studio/) - if you'd like to build the frontend into an app.

Each of these dependencies can be installed in their own way depending on platform, follow the instructions that match your environment.

For `go-bindata`, run the command `go get github.com/zwzn/go-bindata/go-bindata`.


1. Clone the repository to `$GOPATH/src/github.com/zwzn/comicbox`.
```
$ git clone git@github.com:abibby/comicbox.git $(go env GOPATH)/src/github.com/zwzn/comicbox
```

2. Initialize the frontend and download the dependencies.
```
$ cd $(go env GOPATH)/src/github.com/zwzn/comicbox/cordova
$ npm install
$ mkdir www
```

3. Initialize the backand and download the dependencies.
```
$ cd ../comicboxd
$ make data
$ go get ./...
```

4. Build the project
```
$ cd ..
$ make dev
```

5. (**Optional**) Create a configuration file for the server.
```
$ cat > config.yml
port: 8080 # Port the server will listen on (default=8080)
dir: /path/to/your/comics # Path to the directory containing your comics (default=/home/<your user>/comics/)
```

6. Run the server
```
$ ./bin/comicboxd
Using config file: /home/<your user>/go/src/github.com/zwzn/comicbox/config.yml
I: 17:52:57 Starting server at http://localhost:8080
```

You're done! Simply navigate to [localhost:8080](localhost:8080) to access the app.
To scan the specified directory for books go to get settings page and click `START SCAN`