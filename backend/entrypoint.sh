#!/bin/sh

if [ ! -f "FirstRunFlag" ]; then
    echo DO NOT DELETE THIS FILE UNLESS YOU KNOW WHAT YOU ARE DOING! > FirstRunFlag
    python manage.py makemigrations
    python manage.py migrate
    python manage.py flush --no-input
    python manage.py collectstatic --no-input --clear
else
    python manage.py collectstatic --no-input --clear
fi

exec "$@"
