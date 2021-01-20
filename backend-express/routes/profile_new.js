const express = require('express');
const router = express.Router();
const {
  addName
} = require('../db/helpers/dbHelpers');

 

module.exports = ({
  addName
}) => {
  router.post("/",(req,res)=>{
    // console.log(req.body);
    const {fName,lName,diet,avoidances,cuisine} = req.body;
    
   
  });
  return router;
  }