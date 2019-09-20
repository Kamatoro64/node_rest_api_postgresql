#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	CREATE USER api_user;
	CREATE DATABASE test_db;
	GRANT ALL PRIVILEGES ON DATABASE test_db TO api_user;
	ALTER DATABASE test_db OWNER TO api_user;
	
	\connect test_db api_user

	CREATE TABLE users(ID SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL);

	INSERT INTO users (name, email) VALUES  ('Tom', 'tom@example.com');
	INSERT INTO users (name, email) VALUES  ('Dick', 'dick@example.com');
	INSERT INTO users (name, email) VALUES  ('Harry', 'harry@example.com');
EOSQL