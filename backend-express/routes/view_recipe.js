const express = require('express');
const router = express.Router();
 const https = require("https");
 require('dotenv').config();

module.exports = (db) => {
  router.post("/",(req,res)=>{
   const id = req.body.id;
    https.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.APIKEY}`,(response)=>{
    let body1 = "";
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      body1 += chunk
    });
      response.on('end',()=>{
        https.get(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${process.env.APIKEY}`,(response)=>{
      let body2 = "";
      response.setEncoding('utf8');
      response.on('end',()=>{
        const body1Json = JSON.parse(body1);
        const body2Json = JSON.parse(body2);
        // console.log(body1Json)
        // console.log(body2Json)
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




  
