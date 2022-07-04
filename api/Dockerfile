FROM app/app_base
RUN mkdir /app/api
WORKDIR /app/api

RUN apt update && apt install -y libpq-dev gcc
COPY ./requirements.txt /app/api/requirements.txt
RUN pip install -r requirements.txt
COPY ./ /app/api
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]