FROM ubuntu:xenial
# DO NOT EDIT the line above - your final image must be based on ubuntu:xenial


RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y build-essential
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs

WORKDIR /app

COPY . .

RUN ./install.sh

RUN ./build.sh

RUN ./test.sh

ENTRYPOINT ["./run.sh", "test-data/01-input.txt"]
