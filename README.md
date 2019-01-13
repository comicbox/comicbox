# ComicBox

ComicBox is a web based comic reader.

## Setup

Building this project requires the following:
 * [go](https://golang.org/)
 * [go-bindata](https://github.com/zwzn/go-bindata)
 * [nodejs](https://nodejs.org/en/)
 * [npm](https://www.npmjs.com/)

Each of these dependencies can be installed in their own way depending on platform, follow the instructions that match your environment.

For `go-bindata`, run the command `go get github.com/zwzn/go-bindata/go-bindata`.


1. Clone the repository.
```
$ git clone https://github.com/comicbox/comicbox.git
```

2. Download the dependencies.
```
$ make get
```

3. Build the project
```
$ make
```

4. (**Optional**) Create a configuration file for the server.
```
$ cat > config.yml
port: 8080 # Port the server will listen on (default=8080)
dir: /path/to/your/comics # Path to the directory containing your comics (default=/home/<your user>/comics/)
```

5. Run the server
```
$ ./bin/comicboxd
Using config file: /home/<your user>/go/src/github.com/comicbox/comicbox/config.yml
I: 17:52:57 Starting server at http://localhost:8080
```

You're done! Simply navigate to [localhost:8080](localhost:8080) to access the app.

To scan the specified directory for books go to the settings page and click `START SCAN`
