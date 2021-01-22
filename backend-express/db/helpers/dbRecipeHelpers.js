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

  const addRecipe = (name, instructions, image) => {
      const query = {
          text: `INSERT INTO recipes (name, instructions, image) VALUES ($1, $2, $3) RETURNING *` ,
          values: [name, instructions, image]
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

  return {
      getRecipes,
      getUserByEmail,
      addRecipe,
      getUsersPosts,
      getRecipeById
  };
};