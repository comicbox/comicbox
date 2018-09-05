bindata = -o data/bindata.go -pkg data migrations/ web/dist/
build = go build -o ../bin/comicboxd

all:
	go-bindata $(bindata)
	$(build)
	
dev:
	go-bindata -debug $(bindata)
	$(build)