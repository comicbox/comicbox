bindata = -o data/bindata.go -pkg data migrations/ web/dist/
build = go build -o ../bin/comicboxd

all:
	cd web; npm run build-prod
	go-bindata $(bindata)
	$(build)
	
dev:
	go-bindata -debug $(bindata)
	$(build)