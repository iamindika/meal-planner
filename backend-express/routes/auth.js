require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

module.exports = ({getUserByEmail, getUserById}) => {
  
  router.post("/", (req,res)=>{
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
                  }
                })
              }
            )
          })
      });
  })

  router.get("/user", auth, (req, res) => {
    getUserById(req.user.id)
      .then(user => {
        res.json({
          id: user.id,
          fName: user.first_name,
          lName: user.last_name
        })
      })
      .catch(err => {
        res.status(401).send({
          msg: 'Invalid Credentials'
        })
      })
  });
  return router;
}