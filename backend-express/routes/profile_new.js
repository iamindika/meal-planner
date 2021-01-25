const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
 require('../db/helpers/dbHelpers');

module.exports = ({
  getDietId,
  getIngredientIdAvoidance,
  getIngredientIdFavs
}) => {
  router.post("/", auth, (req,res, err)=>{ 
  const {diet,avoidances,favorites,id} = req.body;
  
  const userDiet = getDietId(id,diet)
  
   const userAvoidances = avoidances.forEach((avoidance)=>{
    getIngredientIdAvoidance(id,avoidance,false)
    });
  
  const userFavs = favorites.forEach((favorite)=>{
     getIngredientIdFavs(id,favorite,true)
   })
  Promise.all([userDiet,userAvoidances,userFavs])
  .then((all)=>res.json(all))
  });
  return router;
  }