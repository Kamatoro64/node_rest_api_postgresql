#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	CREATE USER api_user;
	CREATE DATABASE test_db;
	GRANT ALL PRIVILEGES ON DATABASE test_db TO api_user;
	ALTER DATABASE test_db OWNER TO api_user;
EOSQL