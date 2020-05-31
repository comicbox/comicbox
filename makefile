bindata= -o comicboxd/data/bindata.go -pkg data comicboxd/migrations/... web/dist/... comicboxd/app/schema/gql/... web2/dist/...

export GO111MODULE=on

all: comicboxd
	
comicboxd: bindata tidy
	cd comicboxd; go build -o ../bin/comicboxd

npm:
	cd web; npm run build-prod

npm-web2:
	cd web2; npm run build

run: bindata-debug
	go run comicboxd/main.go $(ARGS)

bindata: npm npm-web2
	go-bindata $(bindata)

bindata-debug:
	mkdir -p web/dist
	go-bindata -debug $(bindata)

get: bindata-debug
	go get github.com/zwzn/go-bindata/...
	cd web; npm install
	go get ./...

tidy: 
	go mod tidy

test:
	go test ./...

migration:
	touch comicboxd/migrations/$$(date +%s)_.up.sql
	touch comicboxd/migrations/$$(date +%s)_.down.sql
	