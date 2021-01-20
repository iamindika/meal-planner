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

    const getDietId = (dietName) => {
      const query = {
        text: `SELECT diets.id
              FROM diets
              WHERE diets.name LIKE $1`,
        values: [dietName]
      }

      return db.query(query)
            .then(result => result.rows[0].id)
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

    const addUserDiet = (userId, dietId) => {
      const query = {
        text: `INSERT INTO user_diets (user_id, diet_id)
              VALUES ($1, $2)`,
        values: [userId, dietId]
      }

      return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);      
    } 
   

    return {
        getUsers,
        getUserByEmail,
        addUser,
        getUsersPosts,
        getUserName,
        getUserIngredientPreferences,
        getDietId,
        editUserDiet,
        addUserDiet
    };
};