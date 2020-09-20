FROM node:14.4.0 as web1

COPY web/package.json web/package-lock.json ./
RUN npm install
COPY web/ ./
RUN npm run build-prod

FROM node:14.4.0 as web2

COPY web2/package.json web2/package-lock.json ./
RUN npm install
COPY web2/ ./
RUN npm run build

FROM golang:1.14.4 as go-build

WORKDIR /go/src/github.com/comicbox/comicbox/

# Setup the build dependencies
RUN go get -u github.com/go-bindata/go-bindata/...

# Download go dependencies and compile
# TODO: Figure out a way to cache the go dependencies like we do the JS ones to speed up build
COPY . .

COPY --from=web1 /dist web/dist
COPY --from=web2 /dist web2/dist

RUN go-bindata -o comicboxd/data/bindata.go -pkg data comicboxd/migrations/... web/dist/... comicboxd/app/schema/gql/... web2/dist/... \
    && cd comicboxd; go build -o ../bin/comicboxd

# Now copy it into our base image.
FROM ubuntu

RUN apt-get install -y ca-certificates && update-ca-certificates

COPY --from=go-build /go/src/github.com/comicbox/comicbox/bin/comicboxd /usr/bin/comicboxd
COPY docker.config.yml /config.yml

VOLUME ["/comics"]

CMD ["/usr/bin/comicboxd", "-config", "/config.yml"]
