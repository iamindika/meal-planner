const express = require('express');
const router = express.Router();
require('../db/helpers/dbRecipeHelpers');
require('../db/helpers/dbIngredientHelpers');
require('../db/helpers/dbHelpers');


module.exports = (
  { addRecipe, getRecipeById, getRecipeByApiId },
  { addIngredient, addRecipeIngredients },
  { getIngredientId, addUserFavRecipe, GetUserFavFlag, updateUserFavRecipe }
) => {
  router.post('/', (req, res) => {
    // console.log(req.body.name)
    const { name, image, ingredients, instructions, userFav, api_id } = req.body;
    console.log(userFav, name, ingredients, image, instructions, api_id)
    if (!userFav) {
      getRecipeByApiId(api_id)
        .then((apiId) => {
          if (!apiId) {
            addRecipe(name, instructions, image, api_id)
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
                            // console.log(result)
                            addRecipeIngredients(recipe.id, result.id, ingredient.amount.us.value, ingredient.amount.us.unit)
                              .then((result) => {
                                // console.log(result)
                              });
                          })
                      }
                    });
                });
                addUserFavRecipe(4, recipe.id, !userFav)
                  .then(result => res.json(result));
              });
          } else {
            getRecipeById(name)
              .then((recipeId) => {
                GetUserFavFlag(recipeId, 4)
                  .then((favouriteFlag) => {
                    updateUserFavRecipe(!favouriteFlag, recipeId, 4)
                      .then((result) => console.log(result))
                  })

              })
          }
        })
    } else {
      getRecipeById(name)
        .then((recipeId) => {
          GetUserFavFlag(recipeId, 4)
            .then((favouriteFlag) => {
              updateUserFavRecipe(!favouriteFlag, recipeId, 4)
                .then((result) => console.log(result))
            })

        })
    }
  });
  return router;
};
