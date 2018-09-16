all: 
	cd comicboxd; make
	
dev: 
	cd comicboxd; make dev

watch: 
	cd comicboxd/web; npm run watch

build: 
	cd comicboxd/web; npm run build