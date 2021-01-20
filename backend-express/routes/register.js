const express = require('express');
const router = express.Router();

module.exports = ({addUser}) => {
  
  router.post("/",(req,res)=>{
    const {fName, lName, email, password} = req.body;
    addUser(fName, lName, email, password)
    .then(user => {
      res.send(user);
    });
  })
  return router;
}

