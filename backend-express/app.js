const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');


const db = require('./db');
const dbHelpers = require('./db/helpers/dbHelpers')(db);
const dbRecipeHelpers = require('./db/helpers/dbRecipeHelpers')(db);
const dbIngredientsHelpers = require('./db/helpers/dbIngredientHelpers')(db);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipesRouter =  require('./routes/recipes');
const searchRouter =  require('./routes/search');
const recipeRouter =  require('./routes/view_recipe');
const localRecipesRouter = require('./routes/localRecipes');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const newProfileRouter = require('./routes/profile_new');
const ingredientsRouter = require('./routes/ingredients');
const favoritesRouter = require('./routes/favorites');
const unFavoritesRouter = require('./routes/removeFav');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/posts', usersRouter(dbHelpers));
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/recipes', recipesRouter(dbHelpers));
app.use('/api/search', searchRouter(dbHelpers));
app.use('/api/recipe/:id', recipeRouter(dbHelpers));
app.use('/recipes', localRecipesRouter(dbRecipeHelpers));
app.use('/recipes/user', localRecipesRouter(dbRecipeHelpers));
app.use('/register', registerRouter(dbHelpers));
app.use('/login', loginRouter(dbHelpers));
app.use('/profile/new', newProfileRouter(dbHelpers));
app.use('/ingredients', ingredientsRouter(dbIngredientsHelpers));
app.use('/api/favorites', favoritesRouter(dbRecipeHelpers,dbIngredientsHelpers,dbHelpers));
app.use('/api/favorites/remove', unFavoritesRouter(dbHelpers));

module.exports = app;
