DROP TABLE IF EXISTS user_recipes CASCADE;
CREATE TABLE user_recipes(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id),
    recipe_id INTEGER REFERENCES recipes(id),
    day INTEGER,
    time_slot INTEGER
);