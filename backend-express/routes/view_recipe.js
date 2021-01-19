const express = require('express');
const router = express.Router();
const response = require("../responseData.json");
// import axios from "axios";
 const https = require("https")

module.exports = (db) => {
  router.post("/",(req,res)=>{
   const id = req.body.id;
    https.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=ece32e8a193b4f16ab25e0b78cd51160`,(response)=>{
    let body1 = "";
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      body1 += chunk
    });
      response.on('end',()=>{
        https.get(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=ece32e8a193b4f16ab25e0b78cd51160`,(response)=>{
      let body2 = "";
      response.setEncoding('utf8');
      response.on('end',()=>{
        const body1Json = JSON.parse(body1);
        const body2Json = JSON.parse(body2);
        console.log(body1Json)
        console.log(body2Json)
        res.json({instructions :body1Json,ingredients:body2Json})
      })
      response.on('data', function (chunk) {
      body2 += chunk
    });

    });

})
  });
});
return router;
}




  // https://api.spoonacular.com/recipes/{id}/information?apiKey=ece32e8a193b4f16ab25e0b78cd51160