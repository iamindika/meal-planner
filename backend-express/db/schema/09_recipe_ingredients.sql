DROP TABLE IF EXISTS recipe_ingredients CASCADE;
CREATE TABLE recipe_ingredients(
    id SERIAL PRIMARY KEY NOT NULL,
    recipe_id INTEGER REFERENCES recipes(id),
    ingredient_id INTEGER REFERENCES ingredients(id),
    quantity FLOAT,
    unit varchar(255)
);