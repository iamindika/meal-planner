const express = require('express');
const router = express.Router();
require('../db/helpers/dbHelpers');
const auth = require('../middleware/auth')
module.exports = (
  { GetUserFavFlag, updateUserFavRecipe }
  
 
) => {
  router.post('/',auth, (req, res) => {
    console.log(req.body)
   const {userId,id} = req.body;
   GetUserFavFlag(id,userId)
   .then((favFlag)=>{
     updateUserFavRecipe(!favFlag,id,userId)
     .then((result)=>res.json(result))
   })
  });
  return router;
};