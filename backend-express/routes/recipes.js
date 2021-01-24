const express = require('express');
const router = express.Router();
require('../db/helpers/dbHelpers')
const auth = require('../middleware/auth');

module.exports = (
  { getIngredientsName }

) => {
  router.get("/:id", auth, (req, res) => {
    console.log("User ID:", req.params);
    getIngredientsName(true,4)
    .then((result)=>res.json(result))
    .catch((err)=>console.log(err))
      
  })
  return router;
}
