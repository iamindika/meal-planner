const express = require('express');
const router = express.Router();
require('../db/helpers/dbRecipeHelpers');
require('../db/helpers/dbIngredientHelpers');
require('../db/helpers/dbHelpers');


module.exports = (
  { addRecipe, getRecipeById },
  { addIngredient, addRecipeIngredients },
  { getIngredientId, addUserFavRecipe, deleteUserFavRecipe }
) => {
  router.post('/', (req, res) => {
    // console.log(req.body.name)
    const { name, image, ingredients, instructions, userFav } = req.body;
    //  console.log(heart, name, ingredients, image, instructions)
    let recipeId;
    if (!userFav) {
      addRecipe(name, instructions, image)
        .then((recipe) => {
          // console.log(recipe)
          ingredients.map((ingredient) => {
            // console.log(ingredient)
            getIngredientId(ingredient.name)
              .then((id) => {
                // console.log(id)
                if (!id) {
                  addIngredient(ingredient.name, ingredient.image)
                    .then((result) => {
                      console.log(result)
                      addRecipeIngredients(recipe.id,result.id , ingredient.amount.us.value, ingredient.amount.us.unit)
                        .then((result) => {
                          console.log(result)
                        });
                       })
                }
              });
          });
          addUserFavRecipe(4, recipe.id, true)
                            .then(result => res.json(result));
        });
    } else {
      getRecipeById(name)
        .then((id) => {
          deleteUserFavRecipe(4, id, false)
            .then((result) =>
              res.json(result))
            .catch(err => console.log(err))
        })
    }
  });
   return router;
};
