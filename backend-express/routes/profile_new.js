const express = require('express');
const router = express.Router();
const {
  addName
} = require('../db/helpers/dbHelpers');

 

module.exports = ({
  addName
}) => {
  router.post("/",(req,res)=>{
    // console.log(req.body);
    const {fName,lName,diet,avoidances,cuisine} = req.body;
   addName(fName,lName)
   .then((fName,lName) => console.log(fName,lName))
            .catch((err) => res.json({
                error: err.message
            }));
    // console.log(avoidances)
    // const addProfile = function (listing) {
    //   return db.query(`INSERT INTO items(name,description,photo_url,price,condition,user_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [listing.name, listing.description, listing.photo_url, listing.price, listing.condition, listing.user_id])
    //     .then(res => res.rows[0])
    //     .catch(err => console.log(err));
  
    // }
  });
  return router;
  }