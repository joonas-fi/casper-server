NAME = joonas/casper-server
VERSION = 1.0.0

.PHONY: all build run push

all: build

build:
	docker build -t $(NAME):$(VERSION) .

push:
	docker push $(NAME):$(VERSION)

run:
	docker run --name casper-server -p 8081:80 -d $(NAME):$(VERSION)
