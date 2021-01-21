require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports = ({getUserByEmail}) => {
  
  router.post("/",(req,res)=>{
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields'})
    }

    getUserByEmail(email)
      .then((user)=> {
        if (!user) {
          return res.status(400).json({ msg: 'User does not exist! Please try again or register.' });
        } 

        //Authenticate password
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return res.status(400).json({ msg: "Invalid credentials!" });
            }

            jwt.sign(
              { id: user.id },
              process.env.JWT_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) {
                  throw err;
                } 
                res.json({
                  token,
                  id: user.id,
                  firstName: user.first_name,
                  lastName: user.last_name,
                  email: user.email
                })
              }
            )
          })
      });
  })
  return router;
}