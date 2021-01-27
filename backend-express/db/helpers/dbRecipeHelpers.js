module.exports = (db) => {
  const getRecipes = () => {
      const query = {
          text: 'SELECT * FROM recipes',
      };
      return db
          .query(query)
          .then((result) => result.rows)
          .catch((err) => err);
  };
  const getRecipeById = (name) => {
      const query = {
          text:`SELECT id FROM recipes WHERE name = $1`,
          values:[name]
      }
      return db
          .query(query)
          .then((result) => result.rows[0].id)
          .catch((err) => err);
  };
  

  const getUserRecipes = userId => {

      const query = {
          text: `SELECT user_id, recipe_id, name, image, instructions, day, time_slot
                FROM recipes 
                JOIN user_recipes on recipes.id = recipe_id
                WHERE user_id = $1;` ,
          values: [userId]
      }

      return db
          .query(query)
          .then(result => result.rows)
          .catch((err) => err);
  }

  
  const getUserRecipesBySlot = (userId, time_slot) => {

    const query = {
        text: `SELECT user_id, recipe_id, name, image, instructions, day, time_slot
              FROM recipes 
              JOIN user_recipes on recipes.id = recipe_id
              WHERE user_id = $1 AND time_slot = $2
              ORDER BY day;` ,
        values: [userId, time_slot]
    }

    return db
        .query(query)
        .then(result => result.rows)
        .catch((err) => err);
}


  const addRecipe = (name, instructions, image,apiId) => {
      const query = {
          text: `INSERT INTO recipes (name, instructions, image, api_id) VALUES ($1, $2, $3, $4) RETURNING *` ,
          values: [name, instructions, image, apiId]
      }

      return db.query(query)
          .then(result => result.rows[0])
          .catch(err => err);
  }

  const getRecipeByApiId = (apiId) =>{
    const query = {
        text: `SELECT api_id FROM recipes WHERE api_id = $1` ,
        values: [apiId]
    }
    return db.query(query)
            .then(result => {
              if(result.rows[0]){
                // console.log(result.rows)
                return result.rows[0].api_id
               }
            })
            .catch(err => err);   
  }

  const removeRecipeFromSchedule = (recipeId, userId) => {
    const query = {
        text: `UPDATE user_recipes 
                SET day = NULL, time_slot = NULL
                WHERE recipe_id = $1 AND user_id = $2
                RETURNING *` ,
        values: [recipeId, userId]
    }

    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  }

//   const getUsersPosts = () => {
//       const query = {
//           text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
//       FROM users
//       INNER JOIN posts
//       ON users.id = posts.user_id`
//       }

//       return db.query(query)
//           .then(result => result.rows)
//           .catch(err => err);

//   }

  const getFreeUserRecipes = userId => {

    const query = {
        text: `SELECT user_id, recipe_id, name, image, instructions, day, time_slot
              FROM recipes 
              JOIN user_recipes on recipes.id = recipe_id
              WHERE user_id = $1 AND day IS NULL AND time_slot IS NULL
              ORDER BY name;`,
        values: [userId]
    }

    return db
        .query(query)
        .then(result => result.rows)
        .catch((err) => err);
} 

  const addRecipeToSchedule = (day, timeSlot, recipeId, userId) => {
    const query = {
        text: `UPDATE user_recipes 
                SET day = $1, time_slot = $2
                WHERE recipe_id = $3 AND user_id = $4
                RETURNING *` ,
        values: [day, timeSlot, recipeId, userId]
    }

    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  } 

  return {
      getRecipes,
      getUserRecipes,
      getUserRecipesBySlot,
      addRecipe,
      removeRecipeFromSchedule,
      getRecipeById,
      getRecipeByApiId,
      getFreeUserRecipes,
      addRecipeToSchedule
  };
};