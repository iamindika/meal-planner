const { json } = require('express');
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
    let resultData = {};
    console.log(req.body);
  const {diet,avoidances,favorites,id} = req.body;
  // console.log(req.headers);
  
  getDietId(diet)
  .then((dietId)=>{
    addUserDiet(id,dietId)
    .then((result1)=>resultData.result1 = result1)
  });
 
  avoidances.forEach((avoidance)=>{
    //  console.log(avoidance)
     getIngredientId(avoidance)
    .then((ingredientId)=>{
        // console.log(ingredientId)
      addAvoidances(id,ingredientId,false)
      .then(result2=>resultData.result2 = result2)
     })
   });
  
  
   favorites.forEach((favorite)=>{
    getIngredientId(favorite)
    .then((ingredientId)=>{
      // console.log(ingredientId)
      addUserIngredientFav(id,ingredientId,true)
      .then(result3=>{
        resultData.result3 = result3
        return res.json(resultData)
      })
       })
   })

  });
  return router;
  }