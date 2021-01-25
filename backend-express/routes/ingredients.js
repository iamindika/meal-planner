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
const auth = require('../middleware/auth');
// const {
//     getRecipesByUsers
// } = require('../db/helpers/dbIngredientHelpers');

module.exports = ({
    getIngredients,
    getIngredientsByRecipe,
    addIngredient,
    addRecipeIngredients
}) => {
    /* GET users listing. */
    router.get('/', (req, res) => {
        getIngredients()
            .then((ingredients) => res.json(ingredients))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.get('/recipe/:id', (req, res) => {
        getIngredientsByRecipe(req.params.id)
            .then((ingredients) => res.json(ingredients))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    // router.get('/:id', (req, res) => {
    //     getUserRecipes(req.params)
    //         .then((userRecipes) => {
    //             const formattedRecipes = getRecipesByUsers(userRecipes);
    //             res.json(formattedRecipes);
    //         })
    //         .catch((err) => res.json({
    //             error: err.message
    //         }));
    // });
// **
    router.post('/new', (req, res) => {

        const {
            name,
            image
        } = req.body;

        console.log("From router: name: ", name, "image: ", image)
        
        addIngredient(name, image)
            .then(newIngredient => res.json(newIngredient))
            .catch(err => res.json({
                error: err.message
            }));

    })

    router.post('/recipe/new',  (req, res) => {

        const {
            recipeId,
            ingredientId,
            amount,
            unit
        } = req.body;

        console.log("From router: recipeId: ", recipeId, "ingredientId: ", ingredientId, "amount: ", amount, "unit: ", unit)
        
        addRecipeIngredients(recipeId, ingredientId, amount, unit)
            .then(newRecipeIngredients => res.json(newRecipeIngredients))
            .catch(err => res.json({
                error: err.message
            }));

    })

    return router;
};
