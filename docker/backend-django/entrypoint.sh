#!/bin/bash
set -e

# Check if migrations need to be applied
if [ ! -f /app/.migrated ]; then
    python manage.py migrate
    touch /app/.migrated
fi

# Run the Django server
exec "$@"
