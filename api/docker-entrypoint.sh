#!/bin/sh

echo "Apply database migrations"
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py loaddata auth

exec "$@"