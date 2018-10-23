bindata = -o data/bindata.go -pkg data migrations/ ../cordova/platforms/browser/www/...
build = go build -o ../bin/comicboxd

all:
	cd ../cordova; cordova build browser
	go-bindata $(bindata)
	$(build)
	
dev:
	go-bindata -debug $(bindata)
	$(build)