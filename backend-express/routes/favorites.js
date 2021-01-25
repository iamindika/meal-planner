const express = require('express');
const router = express.Router();
require('../db/helpers/dbRecipeHelpers');
require('../db/helpers/dbIngredientHelpers');
require('../db/helpers/dbHelpers');
const auth = require("../middleware/auth")


module.exports = (
  { addRecipe, getRecipeById, getRecipeByApiId },
  { addIngredient, addRecipeIngredients },
  { getIngredientId, addUserFavRecipe, GetUserFavFlag, updateUserFavRecipe }
) => {
  router.post('/',auth, (req, res) => {
    //  console.log(req.body)
     const { name, image, ingredients, instructions, userFav, api_id,userId } = req.body;
  //   console.log(userFav, name, ingredients, image, instructions, api_id)
     if (!userFav) {
      getRecipeByApiId(api_id)
         .then((apiId) => {
          // console.log(apiId)
          if(!apiId){
            addRecipe(name, instructions, image, api_id)
            .then(recipe=>{
              ingredients.map((ingredient)=>{
              getIngredientId(ingredient.name)
              .then((ingredientId)=>{
                if(!ingredientId){
                 addIngredient(ingredient.name, ingredient.image) 
                 .then((result)=>{
                   addRecipeIngredients(recipe.id, result.id, ingredient.amount.us.value, ingredient.amount.us.unit)
                   .then(result=>console.log(result))
                 })
                }
              })
            }) 
            addUserFavRecipe(userId, recipe.id, !userFav)
            .then(result => console.log(result)); 
           })     
          }
          else{
            getRecipeById(name)
    .then((recipeId) => {
      GetUserFavFlag(recipeId,userId)
      .then((favFlag)=>{
          // console.log(favFlag.favourites)
         updateUserFavRecipe(true,recipeId,userId)
         .then((result)=>console.log(result))
      })
    })   
          }
        })     
     }
    else{
      getRecipeById(name)
    .then((recipeId) => {
      GetUserFavFlag(recipeId,userId)
      .then((favFlag)=>{
          // console.log(favFlag.favourites)
         updateUserFavRecipe(!favFlag.favourites,recipeId,userId)
         .then((result)=>console.log(result))
      })
    })  
    }
   });
  return router;
};
