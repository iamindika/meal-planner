const express = require('express');
const router = express.Router();
require('../db/helpers/dbHelpers')
const auth = require('../middleware/auth');

module.exports = (
  { getIngredientsName }

) => {
  router.get("/:id", auth, (req, res) => {
     const userId = req.params.id;
     console.log("User ID:", userId);
    getIngredientsName(true,userId)
    .then((result)=>res.json(result))
    .catch((err)=>console.log(err))
      
  })
  return router;
}
