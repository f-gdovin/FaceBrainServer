BEGIN TRANSACTION;

CREATE TABLE login (
  id serial PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

COMMIT;