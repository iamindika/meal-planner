const express = require('express');
const router = express.Router();

module.exports = ({getUserByEmail}) => {
  
  router.post("/",(req,res)=>{
    const {email, password} = req.body;
    getUserByEmail(email)
    .then(user => {
      // console.log(user)
      if (user){
        if (user.password === password && user.email === email) {
          req.session['user_id'] = user.id;
          console.log(req.session)
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