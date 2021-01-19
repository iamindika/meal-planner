DROP TABLE IF EXISTS user_ingredients CASCADE;
CREATE TABLE user_ingredients(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id),
    ingredient_id INTEGER REFERENCES ingredients(id),
    include_ingredient BOOLEAN
);