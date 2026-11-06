#!/usr/bin/env bash
# Build step for Render, Railway, Koyeb and similar hosts.
set -o errexit

pip install -r requirements.txt
python portfolio/manage.py collectstatic --noinput
python portfolio/manage.py migrate --noinput
