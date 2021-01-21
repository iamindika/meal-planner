DROP TABLE IF EXISTS user_ingredients CASCADE;
CREATE TABLE user_ingredients(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredients(id) ON DELETE CASCADE,
    include_ingredient BOOLEAN
);