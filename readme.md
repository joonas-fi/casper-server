
What it is about
================

This is a microservice for executing web scraping scripts.

See this 1 minute shell recording for short demonstration:

	https://asciinema.org/a/2vc4cxnyq46vk6tlfng68ec7r

# Build docker image

	$ make

Run it
======

	$ make run


# Run in dev mode

	$ docker run -v "$(pwd)/src:/src" -p 8081:80 -it casper-server

	$ node /src/casper-server.js

