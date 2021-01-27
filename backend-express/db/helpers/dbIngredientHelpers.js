module.exports = (db) => {
  const getIngredients = () => {
      const query = {
          text: 'SELECT * FROM ingredients',
      };
      return db
          .query(query)
          .then((result) => result.rows)
          .catch((err) => err);
  };

  const getIngredientsByRecipe = (recipeId) => {
      const query = {
          text: `SELECT ri.*, i.name, i.image  
                 FROM recipe_ingredients AS ri
                 JOIN ingredients AS i ON ri.ingredient_id = i.id
                 WHERE ri.recipe_id = $1;`,
          values: [recipeId]
      };
      return db
          .query(query)
          .then((result) => result.rows)
          .catch((err) => err);
  };

  const addIngredient = (name, image) => {
      const query = {
          text: `INSERT INTO ingredients (name, image) VALUES ($1, $2) RETURNING *` ,
          values: [name, image]
      }

      return db.query(query)
          .then(result => result.rows[0])
          .catch(err => err);
  }

  const addRecipeIngredients = (recipeId, ingredientId, amount, unit) => {
    const query = {
        text: `INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES ($1, $2, $3, $4) RETURNING *` ,
        values: [recipeId, ingredientId, amount, unit]
    }

    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
}

  return {
      getIngredients,
      getIngredientsByRecipe,
      addIngredient,
      addRecipeIngredients
  };
};