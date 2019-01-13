FROM golang:1.11

WORKDIR /go/src/github.com/comicbox/comicbox/

# Setup the build dependencies
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs
RUN go get github.com/zwzn/go-bindata/go-bindata

# Download js dependencies
COPY makefile .
COPY web/package.json web/package-lock.json web/
RUN cd web && npm install && cd .. 

# Download go dependencies and compile
# TODO: Figure out a way to cache the go dependencies like we do the JS ones to speed up build
COPY . .
RUN make get \
    && make \
    && echo 'dir: /mnt/comics' > config.yml 

# Now copy it into our base image.
FROM gcr.io/distroless/base

COPY --from=0 /go/src/github.com/comicbox/comicbox/bin/comicboxd .
COPY --from=0 /go/src/github.com/comicbox/comicbox/config.yml .

CMD ["/comicboxd"]
