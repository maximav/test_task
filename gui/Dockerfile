FROM app/app_api AS api
RUN mkdir /app/api/files /app/api/static
RUN python3 manage.py collectstatic --noinput

FROM node:16-alpine AS gui
RUN mkdir /temp
WORKDIR /temp
COPY ./package.json /temp/package.json

RUN yarn
COPY ./ /temp/
RUN yarn build

FROM nginx:1.17.9-alpine
RUN mkdir /var/www /var/www/frontend /var/www/backend
COPY --from=api /app/api/files/static/ /var/www/backend/
COPY --from=gui /temp/build/ /var/www/frontend/
