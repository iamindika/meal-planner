const express = require('express');
const router = express.Router();
const response = require("../responseData.json");
const https = require("https")

module.exports = ({addUser}) => {
  
  router.post("/",(req,res)=>{
    const {fName, lName, email, password} = req.body;
    //console.log(fName, lName, email, password);
    addUser(fName, lName, email, password)
    .then(user => {
      res.send(user);
    });
    
    //  const search = req.body.value;
  // https.get(`https://api.spoonacular.com/recipes/search?apiKey=8ab5b8fc182d4b448cd46f79890e625c&query=${search}&number=2&instructionsRequired=true`,(response)=>{
  //   let body = "";
  //   response.setEncoding('utf8');
  //   response.on('data', function (chunk) {
  //     body += chunk
  //   });
  //     response.on('end',()=>{
  //      console.log("end------")
  //      res.json(body);
  //   });
  // })
  })
  return router;
}

