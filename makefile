bindata= -o comicboxd/data/bindata.go -pkg data comicboxd/migrations/... web/dist/...

all: comicboxd
	
comicboxd: bindata
	cd comicboxd; go build -o ../bin/comicboxd

npm: icon
	cd web; npm run build-prod

run: bindata-debug
	go run comicboxd/main.go

bindata: npm
	go-bindata $(bindata)

bindata-debug:
	go-bindata -debug $(bindata)

icon:
	inkscape -f web/res/icons/icon.svg -e web/res/icons/icon.png -h 1024

get:
	cd web; npm install
	go get ./...
