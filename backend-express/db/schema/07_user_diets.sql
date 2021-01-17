DROP TABLE IF EXISTS user_diets CASCADE;
CREATE TABLE user_diets(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id),
    diet_id INTEGER REFERENCES diets(id)
);