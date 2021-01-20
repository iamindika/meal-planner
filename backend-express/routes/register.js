const express = require('express');
const router = express.Router();

module.exports = ({addUser, getDietId}) => {
  
  router.post("/",(req,res)=>{
    getDietId('Vegan')
    .then(dietId => {
      console.log(dietId);
    })
  //   const {fName, lName, email, password} = req.body;
  //   addUser(fName, lName, email, password)
  //   .then(user => {
      
      // console.log(user);
      // res.send(user);
    // });
  })
  return router;
}

