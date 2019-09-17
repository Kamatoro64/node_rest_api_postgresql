-- Assumes postgresql installed and started locally
-- Assumes api_user created with no password 
-- Assumes test_db created using api_user

-- psql postgres
-- CREATE ROLE api_user;
-- ALTER ROLE api_user CREATEDB;

-- Logout and re-login as api_user
-- psql -d postgres -U api_user
-- CREATE DATABASE users;

-- psql -U api_user -d test_db -a -f init.sql 


DROP TABLE users;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email) VALUES  ('John', 'john@example.com');

INSERT INTO users (name, email)
VALUES  ('Jane', 'jane@example.com');

INSERT INTO users (name, email)
VALUES  ('George', 'george@example.com');
