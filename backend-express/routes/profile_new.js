const express = require('express');
const router = express.Router();
 require('../db/helpers/dbHelpers');

module.exports = ({
  addUserDiet,
  getDietId,
  getIngredientId,
  addAvoidances,
  addUserIngredientFav
}) => {
  router.post("/",(req,res)=>{
  const {diet,avoidances,favorites} = req.body;
   console.log(diet,avoidances,favorites);
  getDietId(diet)
  .then((dietId)=>{
    addUserDiet(2,dietId)
    .then((result)=>console.log(result))
  });
  avoidances.forEach((avoidance)=>{
    // console.log(avoidance)
    getIngredientId(avoidance)
    .then((ingredientId)=>{
      console.log(ingredientId)
      addAvoidances(2,ingredientId,false)
      .then(res=>console.log(res))
     })
   });
   favorites.forEach((favorite)=>{
    getIngredientId(favorite)
    .then((ingredientId)=>{
      // console.log(ingredientId)
      addUserIngredientFav(4,ingredientId,true)
      .then(res=>{
        console.log("hello:" + res)
      })
     })
   });
  
  
  });
  return router;
  }