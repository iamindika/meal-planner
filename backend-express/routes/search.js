const express = require('express');
const router = express.Router();
const response = require("../responseData.json");
const https = require("https")

module.exports = (db) => {
  router.post("/",(req,res)=>{
  console.log(req.body)
  res.json(req.body)
  })
  return router;
}
