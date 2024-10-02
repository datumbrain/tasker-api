#!/usr/bin/env bash

set -a
source .env
set +a

psql -U postgres -p $DB_PORT -c "CREATE DATABASE $DB_NAME;"
psql -U postgres -p $DB_PORT -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
psql -U postgres -d $DB_NAME -p $DB_PORT -c "GRANT SELECT ON ALL TABLES IN SCHEMA public TO $DB_USER;"
psql -U postgres -d $DB_NAME -p $DB_PORT -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
psql -U postgres -d $DB_NAME -p $DB_PORT -c "GRANT ALL ON SCHEMA public TO $DB_USER;"
