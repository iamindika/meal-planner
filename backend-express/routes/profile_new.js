const express = require('express');
const router = express.Router();
 require('../db/helpers/dbHelpers');

 

module.exports = ({
  addUserDiet
}) => {
  router.post("/",(req,res)=>{
  const {diet,avoidances,favorites} = req.body;
  console.log(diet,avoidances,favorites);
  addUserDiet()

   
  });
  return router;
  }