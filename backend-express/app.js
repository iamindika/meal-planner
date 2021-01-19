const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./db');
const dbHelpers = require('./db/helpers/dbHelpers')(db);
const dbRecipeHelpers = require('./db/helpers/dbRecipeHelpers')(db);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipesRouter =  require('./routes/recipes');
const searchRouter =  require('./routes/search');

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
app.use('/api/:id/recipe', searchRouter(dbHelpers));

module.exports = app;
