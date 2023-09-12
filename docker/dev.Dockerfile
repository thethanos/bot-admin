FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install -y curl && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get update && apt-get upgrade -y && \
    apt-get install -y apt-transport-https ca-certificates gnupg python3 psmisc nodejs