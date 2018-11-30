all: comicboxd
	
comicboxd: npm
	cd comicboxd; go build -o ../bin/comicboxd

npm:
	cd web; npm run build-prod

run:
	cd comicboxd; go run main.go

get:
	cd web; npm install
	cd comicboxd; go get