const express = require('express');
const apiRouter = express.Router();

const recipesRouter = require('./recipes');
apiRouter.use('/recipes', recipesRouter);

const cuisinesRouter = require('./cuisines');
apiRouter.use('/cuisine-types', cuisinesRouter);

const mealsRouter = require('./meals');
apiRouter.use('/meal-types', mealsRouter);

const stylesRouter = require('./styles');
apiRouter.use('/cooking-styles', stylesRouter);

const unitsRouter = require('./units');
apiRouter.use('/units', unitsRouter);

module.exports = apiRouter;