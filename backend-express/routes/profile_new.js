const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
 require('../db/helpers/dbHelpers');

module.exports = ({
  getDietId,
  addUserDiet,getIngredientId,addAvoidances,addUserIngredientFav
}) => {
  router.post("/", auth, (req,res, err)=>{ 
  const {diet,avoidances,favorites,id} = req.body;
  
   getDietId(diet)
   .then((dietId)=>{
     addUserDiet(id,dietId)
     .then((result)=>console.log(result))
   })
   .then(()=>{
    avoidances.forEach((avoidance)=>{
      getIngredientId(avoidance)
      .then((ingredientId)=>{
        addAvoidances(id,ingredientId,false)
        .then((result)=>console.log(result))
      })
    })
   }).then(()=>{
    favorites.forEach((favorite)=>{
      getIngredientId(favorite)
      .then((ingredientId)=>{
    addUserIngredientFav(id,ingredientId,true)
    .then((result)=>console.log(result))
      })
    })
   })
  });
  return router;
  }