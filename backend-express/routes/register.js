const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = ({addUser,getUserByEmail}) => {
  
  router.post("/", (req,res) => {
    const {fName, lName, email, password} = req.body;
    
    //Validation
    if (!fName || !lName || !email || !password) {
      console.log('Validation Failed!');
      return res.status(400).json({ msg: 'Please enter all fields'})
    }

    getUserByEmail(email)
      .then((user)=> {
        if (user) {
          return res.status(400).json({ msg: 'User already exists! Please login.' });
        } 

        //Hash password
        bcrypt.hash(password, saltRounds, function(err, hash) {
          if (err) {
            throw err;
          }
          addUser(fName, lName, email, hash)
            .then(user =>  {
              res.send({
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email
              })
            });
        });
      });
  })
  return router;
}

