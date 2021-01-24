const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
 require('../db/helpers/dbHelpers');

module.exports = ({
  addUserDiet,
  getDietId,
  getIngredientId,
  addAvoidances,
  addUserIngredientFav
}) => {
  router.post("/", auth, (req,res, err)=>{
  const {diet,avoidances,favorites} = req.body;
   console.log(diet,avoidances,favorites);
  getDietId(diet)
  .then((dietId)=>{s
    addUserDiet(2,dietId)
    .then((result1)=>res.write(result1))
  });
  
  avoidances.forEach((avoidance)=>{
     console.log(avoidance)
     getIngredientId(avoidance)
    .then((ingredientId)=>{
        // console.log(ingredientId)
      addAvoidances(2,ingredientId,false)
      .then(result2=>res.write(result2))
     })
   });

   favorites.forEach((favorite)=>{
    getIngredientId(favorite)
    .then((ingredientId)=>{
      // console.log(ingredientId)
      addUserIngredientFav(4,ingredientId,true)
      .then(result3=>{
        res.write(result3)
      })
       })
   });
   res.json();
  });
  return router;
  }