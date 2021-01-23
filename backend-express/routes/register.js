require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = ({addUser,getUserByEmail}) => {
  
  router.post("/", (req,res) => {
    const {fName, lName, email, password} = req.body;
    
    //Validation
    if (!fName || !lName || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields'})
    }

    getUserByEmail(email)
      .then((user)=> {
        if (user) {
          return res.status(400).json({ msg: 'User already exists! Please login.' });
        } 

        //Create salt & hash
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            throw err;
          }
          bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
              throw err;
            }
            addUser(fName, lName, email, hash)
              .then(user =>  {
  
                jwt.sign(
                  { id: user.id },
                  process.env.JWT_SECRET,
                  (err, token) => {
                    if (err) {
                      throw err;
                    } 
                    res.json({
                      token,
                      user: {
                        id: user.id,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email
                      }
                    })
                  }
                )
              });
          });
        })
        
      });
  })
  return router;
}

