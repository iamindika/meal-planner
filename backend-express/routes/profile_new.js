const express = require('express');
const router = express.Router();
 require('../db/helpers/dbHelpers');

 

module.exports = ({
  addDiet
}) => {
  router.post("/",(req,res)=>{
  const {diet,avoidances,favorites} = req.body;
  console.log(diet,avoidances,favorites);
  addDiet()

   
  });
  return router;
  }