bindata = -o data/bindata.go -pkg data migrations/ ../cordova/www/dist/
build = go build -o ../bin/comicboxd

all:
	cd ../cordova; npm run build-prod
	go-bindata $(bindata)
	$(build)
	
dev:
	go-bindata -debug $(bindata)
	$(build)