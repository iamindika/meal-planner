const express = require('express');
const router = express.Router();
const response = require("../responseData.json");
const https = require("https");
require('dotenv').config();
const auth = require("../middleware/auth");

module.exports = ({
  getUserIngredientPref
}) => {
  router.post("/",auth,(req,res)=>{
     const search = req.body.value;
     const userId = req.body.userId;
     
     const userPreferences = {avoid:undefined,favourites:undefined};

     getUserIngredientPref(userId,false)
     .then((response)=>{
       userPreferences.avoid = response;
     })
     .then(()=>getUserIngredientPref(userId,true))
     .then((response)=>{
      userPreferences.favourites = response;
    })
    .then(()=>{
      // console.log("user",userPreferences)
      const avoidance = userPreferences.avoid.map((ingredient)=>{
        return ingredient.name
      }).join(",");

      const fav = userPreferences.favourites.map((ingredient)=>{
        return ingredient.name
      }).join(",");
      
      https.get(`https://api.spoonacular.com/recipes/search?apiKey=${process.env.APIKEY}&query=${search}&includeIngredients=${fav}&excludeIngredients=${avoidance}&number=10&instructionsRequired=true`,(response)=>{
        let body = "";
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          body += chunk
        });
          response.on('end',()=>{
          //  console.log("end------")
           res.json(body);
        });
      })
    })
  
    
    

  
  })
  return router;
}

