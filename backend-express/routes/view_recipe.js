const express = require('express');
const router = express.Router();
const response = require("../responseData.json");
import axios from "axios";
// const https = require("https")

module.exports = (db) => {
  router.post("/",(req,res)=>{
    axios.get("https://api.spoonacular.com/recipes/{id}/information?apiKey=")
  });
    return router;
  }