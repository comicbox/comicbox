all:
	go-bindata -o data/bindata.go -pkg data migrations/ web/dist/
	go build -o ../bin/comicboxd
	
dev:
	go-bindata -debug -o data/bindata.go -pkg data migrations/ web/dist/
	go build -o ../bin/comicboxd