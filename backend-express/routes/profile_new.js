const express = require('express');
const router = express.Router();
 

module.exports = (db) => {
  router.post("/",(req,res)=>{
    console.log(req.body)
    // const addProfile = function (listing) {
    //   return db.query(`INSERT INTO items(name,description,photo_url,price,condition,user_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [listing.name, listing.description, listing.photo_url, listing.price, listing.condition, listing.user_id])
    //     .then(res => res.rows[0])
    //     .catch(err => console.log(err));
  
    // }
  });
  return router;
  }