const express = require('express');
const apiRouter = express.Router();

const recipesRouter = require('./recipes');
apiRouter.use('/recipes', recipesRouter);

const cuisinesRouter = require('./cuisine-types');
apiRouter.use('/cuisine-types', cuisinesRouter);

const mealsRouter = require('./meal-types');
apiRouter.use('/meal-types', mealsRouter);


const stylesRouter = require('./cooking-styles');
apiRouter.use('/cooking-styles', stylesRouter);

module.exports = apiRouter;