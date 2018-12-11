bindata= -o comicboxd/data/bindata.go -pkg data comicboxd/migrations/... web/dist/... comicboxd/app/schema/gql/...

all: comicboxd
	
comicboxd: bindata
	cd comicboxd; go build -o ../bin/comicboxd

npm:
	cd web; npm run build-prod

run: bindata-debug
	go run comicboxd/main.go

bindata: npm
	go-bindata $(bindata)

bindata-debug:
	go-bindata -debug $(bindata)

get:
	cd web; npm install
	go get ./...
