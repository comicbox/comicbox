all: comicboxd
	
comicboxd: npm
	cd comicboxd; go build -o ../bin/comicboxd

npm:
	cd web; npm run build-prod

run:
	go run comicboxd/main.go

get:
	cd web; npm install
	cd comicboxd; go get