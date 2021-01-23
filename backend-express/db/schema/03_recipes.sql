DROP TABLE IF EXISTS recipes CASCADE;
CREATE TABLE recipes(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    instructions TEXT,
    api_id INTEGER
);