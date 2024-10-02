#!/usr/bin/env bash

set -a
source .env
set +a

psql -U postgres -p $DB_PORT -c "REVOKE ALL PRIVILEGES ON DATABASE $DB_NAME FROM $DB_USER;"
psql -U postgres -p $DB_PORT -c "DROP DATABASE IF EXISTS $DB_NAME;"
psql -U postgres -p $DB_PORT -c "DROP USER IF EXISTS $DB_USER;"
