const express = require('express');
const router = express.Router();
require('../db/helpers/dbHelpers')

module.exports = (
  { getIngredientsName }

) => {
  router.get("/", (req, res) => {
    getIngredientsName(true,4)
    .then((result)=>res.json(result))
    .catch((err)=>console.log(err))
      
  })
  return router;
}
