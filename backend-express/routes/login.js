const express = require('express');
const router = express.Router();

module.exports = ({getUserByEmail}) => {
  
  router.post("/",(req,res)=>{
    const {email, password} = req.body;
    getUserByEmail(email)
    .then(user => {
      if (user){
        if (user.password === password) {
          res.send("User authenticated!");
        } else {
          res.send("Invalid Password please try again!")
        }
      } else {
        res.send("No user found by that email! Please Register")
      }
    });
  })
  return router;
}