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
  const userPreferences = {diet:undefined,avoidances:undefined,favs:undefined}

  getDiet(userId)
  .then((result)=>userPreferences.diet = result)
  .then(()=>{
    getUserIngredientPref(userId,false)
    .then((result)=>userPreferences.avoidances = result)
  })
  .then(()=>{
    getUserIngredientPref(userId,true)
    .then((result)=>{
      userPreferences.favs = result;
      res.json(userPreferences)
    })
  })
  
  });
  return router;
  }