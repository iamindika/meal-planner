const express = require('express');
const { get } = require('.');
const { user } = require('../db');
const router = express.Router();
const auth = require('../middleware/auth');
require('../db/helpers/dbHelpers')

module.exports = ({
  getDiet,getUserIngredientPref
}) => {
  router.get("/:id", auth, (req,res, err)=>{
  
  const userId = req.params.id;

  const diet = getDiet(userId)
  
  const userAvoidances=  getUserIngredientPref(userId,false)
  
  const favUserIngredients = getUserIngredientPref(userId,true)
  
  Promise.all([diet,userAvoidances,favUserIngredients])
  .then((all)=>res.json(all))
   
  });
  return router;
  }