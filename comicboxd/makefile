bindata = -o data/bindata.go -pkg data migrations/... ../web/dist/...
build = go build -o ../bin/comicboxd

all: data
	$(build)
	
dev:
	go-bindata -debug $(bindata)
	$(build)

data:
	cd ../web; npm run build-prod
	go-bindata $(bindata)

data-watch:
	cd ../web; npm run build-prod
	go-bindata $(bindata)

bsd:
	cd ../web; npm run build-prod
	go-bindata $(bindata)
	env GOOS=freebsd $(build)-bsd
