DROP TABLE IF EXISTS user_recipes CASCADE;
CREATE TABLE user_recipes(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    day INTEGER,
    time_slot INTEGER,
    favourites BOOLEAN DEFAULT true
);