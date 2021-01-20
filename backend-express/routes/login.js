const express = require('express');
const router = express.Router();

module.exports = ({getUserByEmail}) => {
  
  router.post("/",(req,res)=>{
    const {email, password} = req.body;
    console.log(email, password);
    // addUser(fName, lName, email, password)
    // .then(user => {
    //   res.send(user);
    // });
  })
  return router;
}