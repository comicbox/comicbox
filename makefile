<<<<<<< HEAD
all: comicboxd
	
comicboxd: npm
=======
bindata= -o comicboxd/data/bindata.go -pkg data comicboxd/migrations/... web/dist/...

all: comicboxd
	
comicboxd: bindata
>>>>>>> master
	cd comicboxd; go build -o ../bin/comicboxd

npm:
	cd web; npm run build-prod

<<<<<<< HEAD
run:
	go run comicboxd/main.go

get:
	cd web; npm install
	cd comicboxd; go get
=======
run: bindata-debug
	go run comicboxd/main.go

bindata: npm
	go-bindata $(bindata)

bindata-debug:
	go-bindata -debug $(bindata)

get:
	cd web; npm install
	go get ./...
>>>>>>> master
