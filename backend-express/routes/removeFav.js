const express = require('express');
const router = express.Router();
require('../db/helpers/dbHelpers');
module.exports = (
  { GetUserFavFlag, updateUserFavRecipe }
  
 
) => {
  router.post('/', (req, res) => {
    console.log(req.body)
  const {id} = req.body;
   GetUserFavFlag(id,4)
   .then((favFlag)=>{
     updateUserFavRecipe(!favFlag,id,4)
     .then((result)=>res.json(result))
   })
  });
  return router;
};