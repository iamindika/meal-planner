const express = require('express');
const router = express.Router();


module.exports = ({addUser,getUserByEmail}) => {
  
  router.post("/",(req,res)=>{
    const {fName, lName, email, password} = req.body;
     getUserByEmail(email)
     .then((user)=> {
       if (!user) {
        addUser(fName,lName,email,password)
           .then(userId=>  {
          //  console.log(userId.id)
          console.log(req.session)
            req.session['user_id'] = userId.id;
          console.log(req.session)
        });
       }else{
           res.sendStatus(400);
          }
       });
    })
  return router;
}

