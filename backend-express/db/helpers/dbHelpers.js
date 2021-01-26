module.exports = (db) => {
    const getUsers = () => {
        const query = {
            text: 'SELECT * FROM users',
        };

        return db
            .query(query)
            .then((result) => result.rows)
            .catch((err) => err);
    };

    const getUserByEmail = email => {

        const query = {
            text: `SELECT * FROM users WHERE email = $1` ,
            values: [email]
        }

        return db
            .query(query)
            .then(result => result.rows[0])
            .catch((err) => err);
    }

    const getUserById = id => {

      const query = {
          text: `SELECT id, first_name, last_name, email  
          FROM users WHERE id = $1` ,
          values: [id]
      }

      return db
          .query(query)
          .then(result => result.rows[0])
          .catch((err) => err);
    }

    const addUser = (firstName, lastName, email, password) => {
        const query = {
            text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *` ,
            values: [firstName, lastName, email, password]
        }

        return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);
    }

    const getUsersPosts = () => {
        const query = {
            text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
        FROM users
        INNER JOIN posts
        ON users.id = posts.user_id`
        }

        return db.query(query)
            .then(result => result.rows)
            .catch(err => err);

    }

    const getUserName = (userId) => {
      const query = {
        text:   `SELECT first_name, last_name 
                FROM users
                WHERE id = $1`,
        values: [userId]
      }

      return db.query(query)
            .then(result => result.rows)
            .catch(err => err);
    }

    const getUserIngredientPreferences = (userId, avoidIngredients = false) => {
      const query = {
        text:   `SELECT ingredients.name AS ingredient
                FROM ingredients 
                JOIN user_ingredients ON ingredients.id = user_ingredients.ingredient_id
                JOIN users ON users.id = user_ingredients.user_id
                WHERE users.id = $1 AND user_ingredients.include_ingredient = $2`,
        values: [userId, avoidIngredients]
      }

      return db.query(query)
            .then(result => result.rows)
            .catch(err => err);
    } 
    
    const addUserDiet = (userId, dietId) => {
      const query = {
        text: `INSERT INTO user_diets (user_id, diet_id)
              VALUES ($1, $2) RETURNING *`,
        values: [userId, dietId]
      }
      return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);      
    }    

    const getDietId = (dietName) => {
      const query = {
        text: `SELECT diets.id
              FROM diets
              WHERE diets.name LIKE $1`,
        values: [dietName]
      }
       return db.query(query)
            .then(result =>result.rows[0].id)
            .catch(err => err);
    }

    const editUserDiet = (userId, dietId) => {
      const query = {
        text: `UPDATE user_diets
               SET diet_id = $1
               WHERE user_id = $2`,
        values: [dietId, userId]
      }

      return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);      
    }
    const addAvoidances = (userId,ingredientId,avoidIngredients = false) =>{
      const query = {
          text:`INSERT INTO user_ingredients (user_id,ingredient_id,include_ingredient) VALUES ($1,$2,$3) RETURNING *`,
          values:[userId,ingredientId,avoidIngredients]
      }
      return db.query(query)
      .then(result => result.rows)
      .catch(err => err);      
    }
   
const getIngredientId = (ingredientName) =>{
  const query = {
    text:`SELECT ingredients.id
    FROM ingredients
    WHERE ingredients.name LIKE $1`,
    values: [ingredientName]
}
return db.query(query)
            .then(result => {
              if(result.rows[0]){
                return result.rows[0].id 
              } 
            });
}
    
    const addUserIngredientFav = (userId,ingredientId,FavIngredients = true)=>{
        const query = {
            text:`INSERT INTO user_ingredients (user_id,ingredient_id,include_ingredient) VALUES ($1,$2,$3) RETURNING *`,
            values:[userId,ingredientId,FavIngredients]
        }
        return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);      
      }


  const addUserFavRecipe = (userId,recipeId,favourites=true) => {
    const query = {
      text:`INSERT INTO user_recipes (user_id,recipe_id,favourites) VALUES ($1,$2,$3) RETURNING *`,
      values:[userId,recipeId,favourites]
  }
  return db.query(query)
  .then(result => result.rows[0])
  .catch(err => err);  
  }
  const updateUserFavRecipe = (favourites,recipeId,userId) => {
    const query = {
      text:`UPDATE user_recipes SET favourites = $1 WHERE recipe_id =$2 AND user_id = $3 RETURNING *`,
      values:[favourites,recipeId,userId]
  }
  return db.query(query)
  .then(result => result.rows[0])
  .catch(err => err);  
  }
  const GetUserFavFlag = (recipeId,userId) => {
    const query = {
      text:`SELECT favourites FROM user_recipes WHERE recipe_id = $1 AND user_id = $2 `,
      values:[recipeId,userId]
  }
  return db.query(query)
  .then(result => result.rows[0])
  .catch(err => err);  
  }

  const getFavRecipe = (userId,favourites=true) =>{
    const query = {
      text:`SELECT * FROM user_recipes WHERE user_id = $1 AND favourites = $2 `,
      values:[userId,favourites]
    }
    return db.query(query)
  .then(result => result.rows)
  .catch(err => err); 
  }

  const getFavRecipeIngredients = (recipeId) =>{
    const query = {
      text:`SELECT * FROM recipe_ingredients WHERE recipe_id = $1`,
      values:[recipeId]
    }
    return db.query(query)
  .then(result => result.rows)
  .catch(err => err); 
  }
  const getIngredientName = (ingredientId,recipeId) =>{
    const query = {
      text:`SELECT * FROM ingredients
      JOIN recipe_ingredients ON ingredients.id = recipe_ingredients.ingredient_id
       WHERE ingredients.id = $1 AND recipe_id = $2`,
      values:[ingredientId,recipeId]
    }
    return db.query(query)
  .then(result => result.rows[0])
  .catch(err => err); 
  }

  const getIngredientsName =(favourites=true,userId) => {

    let favoriteRecipes = null;

    const recipeInfo = {
      text: `
      SELECT recipes.id as recipe_id, recipes.name as recipe_name, recipes.image as recipe_image, recipes.instructions as recipe_intructions 
      FROM recipes
      JOIN
      user_recipes
      ON recipes.id = user_recipes.recipe_id
      WHERE user_recipes.favourites = $1 AND user_recipes.user_id = $2
    `,
      values: [favourites, userId]
    }

    return db
      .query(recipeInfo)
      .then(result => {

        const ingredientQueries =[];
        favoriteRecipes = result.rows.map(recipe => {

          return ({
            recipe: {
              recipeId: recipe.recipe_id,
              recipeName: recipe.recipe_name,
              recipeImage: recipe.recipe_image,
              recipeInstructions: recipe.recipe_intructions
        
            },
            ingredients: []
          })
        }) // closing map

          for (let recipeObj of favoriteRecipes) {
            // console.log(recipeObj.recipe.recipeId)
            const ingredientInfo = {
              text:`
                SELECT ingredients.name, recipe_ingredients.quantity, recipe_ingredients.unit,recipe_ingredients.recipe_id
                FROM ingredients
                JOIN recipe_ingredients
                ON ingredients.id = recipe_ingredients.ingredient_id
                WHERE recipe_ingredients.recipe_id = $1
              `,
              values: [recipeObj.recipe.recipeId]
            }

            // creating a promise, and adds it to the array
            ingredientQueries.push(db.query(ingredientInfo));
          }

        return Promise.all(ingredientQueries)

        })
        .then(result=>{
           for(let ingredients of result){

              for (let ingredient of ingredients.rows) {

                const recipeFound = favoriteRecipes.find((recipeObj)=> recipeObj.recipe.recipeId === ingredient.recipe_id)
                recipeFound.ingredients.push({name:ingredient.name,quantity:ingredient.quantity,unit:ingredient.unit})                
              }
           }
           return favoriteRecipes;
        })

      .catch(err => {
        console.log(err.message);
      })
  }

  const getDiet = (userId) =>{
    const query = {
      text:`SELECT diets.name FROM diets JOIN user_diets ON diets.id = user_diets.diet_id WHERE user_id = $1`,
      values:[userId]
    }
    return db.query(query)
  .then(result => result.rows[0])
  .catch(err => err); 

  }

  const getUserIngredientPref = (userId,includeIngredient) =>{
    const query = {
      text:`SELECT ingredients.name FROM ingredients JOIN user_ingredients ON ingredients.id = user_ingredients.ingredient_id WHERE user_ingredients.user_id = $1 AND user_ingredients.include_ingredient = $2`,
      values:[userId,includeIngredient]
    }
    return db.query(query)
    .then(result => result.rows)
    .catch(err => err); 
  }

  const removeUserDietPreferences = (userId) => {
    const query = {
      text: `DELETE FROM user_diets
            WHERE user_id = $1
            RETURNING *`,
      values: [userId]
    }

    return db.query(query)
      .then(deleted => deleted.rows)
      .catch(err => err);
  }

  const removeUserIngredientPreferences = (userId) => {
    const query = {
      text: `DELETE FROM user_ingredients
            WHERE user_id = $1
            RETURNING *`,
      values: [userId]
    }

    return db.query(query)
      .then(deleted => deleted.rows)
      .catch(err => err);
  }

    return {
        getUsers,
        getUserByEmail,
        getUserById,
        addUser,
        getUsersPosts,
        getUserName,
        getUserIngredientPreferences,
        getDietId,
        editUserDiet,
        addUserDiet,
        addAvoidances,
        addUserIngredientFav,
        addUserFavRecipe,
        updateUserFavRecipe,
        getFavRecipe,
        getFavRecipeIngredients,
        getIngredientName,
        getIngredientsName,
        GetUserFavFlag,
        getDiet,
        getUserIngredientPref,
        getIngredientId,
        removeUserDietPreferences,
        removeUserIngredientPreferences
    };
};
// Gujarati Dry Mung Bean Curry
