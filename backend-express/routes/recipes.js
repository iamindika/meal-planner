// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
// **
const express = require('express');
const router = express.Router();
const {
    getRecipesByUsers
} = require('../db/helpers/dbRecipeHelpers');

module.exports = ({
    getRecipes,
    getRecipeByName,
    getRecipeById,
    getUserRecipes,
    addRecipe
}) => {
    /* GET users listing. */
    router.get('/', (req, res) => {
        getRecipes()
            .then((recipes) => res.json(recipes))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.get('/:id', (req, res) => {
        getUserRecipes(req.params)
            .then((userRecipes) => {
                const formattedRecipes = getRecipesByUsers(userRecipes);
                res.json(formattedRecipes);
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });
// **
    router.post('/new', (req, res) => {

        const {
            name,
            instructions,
            image
        } = req.body;

        console.log("From router: name: ", name, "instruction: ", instructions, "image: ", image)
        
        addRecipe(name, instructions, image)
            .then(newRecipe => res.json(newRecipe))
            .catch(err => res.json({
                error: err.message
            }));

    })

    return router;
};
