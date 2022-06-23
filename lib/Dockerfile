FROM ubuntu:20.04

RUN apt-get update && apt-get install -y \
    git \
    python3-pip \
    locales \
    libpq-dev

RUN python3 -m pip install --upgrade pip
RUN pip install --upgrade setuptools

RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

RUN mkdir /app /app/lib
COPY ./requirements.txt /app/lib/requirements.txt
RUN pip install -r /app/lib/requirements.txt
COPY ./ /app/lib
RUN pip install /app/lib/
