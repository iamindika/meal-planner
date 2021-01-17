DROP TABLE IF EXISTS recipe_diets CASCADE;
CREATE TABLE recipe_diets(
    id SERIAL PRIMARY KEY NOT NULL,
    recipe_id INTEGER REFERENCES recipes(id),
    diet_id INTEGER REFERENCES diets(id)
);