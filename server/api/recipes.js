const express = require('express');
const recipesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const ingredientsRouter = require('./ingredients');
const instructionsRouter = require('./instructions');

// route param for recipe
recipesRouter.param('recipeId', (req, res, next, id) => {

    db.get(`SELECT * FROM Recipes WHERE id=$id`, {$id: id}, (err, recipe) => {

        if (err) {
            res.sendStatus(404)
        } else if (!recipe) {
            res.sendStatus(404)
        } else {
            req.recipe = recipe;
            next()
        }

    })

})

recipesRouter.use('/:recipeId/ingredients', ingredientsRouter);
recipesRouter.use('/:recipeId/instructions', instructionsRouter);

// GET all recipes (bare minimum) + meal/cuisine/cooking style tables
recipesRouter.get('/', (req, res, next) => {

    db.all(`SELECT * FROM Recipes`, (err, recipes) => {

        if (err) {
            next(err)
        } else {
            res.status(200).json({recipes: recipes})
        }

    })

})

// GET all recipes with name matching search term


// GET one recipe (with full details)
recipesRouter.get('/:recipeId', (req, res, next) => {

    db.serialize(() => {

        db.all(`SELECT * FROM Ingredients WHERE recipe_id=$id`, {$id: req.params.recipeId}, (err, ingredients) => {
            
            if (err) {
                next(err)
            } else {
                req.recipe.ingredients = ingredients
            }

        })

        db.all(`SELECT * FROM Instructions WHERE recipe_id=$id`, {$id: req.params.recipeId}, (err, instructions) => {
            
            if (err) {
                next(err)
            } else {
                req.recipe.instructions = instructions;
                res.status(200).json({recipe: req.recipe})
            }

        })

    })

})

// POST/add one recipe
recipesRouter.post('/', (req, res, next) => {

    const { name, image, time, servings, notes } = req.body;

    const sql = `INSERT INTO Recipes (name, image, time, servings, notes) VALUES ($name, $image, $time, $servings, $notes)`;
    const values = {$name: name, $image: image, $time: time, $servings: servings, $notes: notes};

    if (!name || !time || !servings) {
        db.run(sql, values, function(err) {
            if (err) {
                next(err)
            } else {
                const recipeId = this.lastID;

                // retrieving last posted recipe
                db.get(`SELECT * FROM Recipes WHERE id=$id`, {$id: recipeId}, function(err, recipe) {
                    if (err) {
                        next(err)
                    } else {
                        recipe = recipe;
 
                    }
                })
            }
        })
    }
    
})

// PUT/update one recipe
recipesRouter.put('/:recipeId', (req, res, next) => {

    const { name, image, time, servings, notes } = req.body.recipe;
    const sql = `UPDATE Recipes SET name=$name image=$image time=$time servings=$servings notes=$notes WHERE id=$id`;
    const values = {$id: req.params.recipeId, $name: name, $image: image, $time: time, $servings: servings, $notes: notes};

    if (!name || !time || !servings) {
        res.sendStatus(400)
    } else {
        db.run(sql, values, (err) => {
            if (err) {
                next(err)
            } else {
                db.get(`SELECT * FROM Recipes WHERE id=$id`, {$id: req.params.recipeId}, (err, recipe) => {
                    if (err) {
                        next(err)
                    } else {
                        res.status(200).json({recipe: recipe})
                    }
                })
            }
        })
    }
})

// DELETE one recipe
recipesRouter.delete('/:recipeId', (req, res, next) => {
    db.serialize(() => {

        db.get(`SELECT * FROM Ingredients WHERE recipe_id=$id`, {$id: req.params.recipeId}, (err, ingredient) => {
            if (err) {
                next(err)
            } else if (ingredient) {
                res.sendStatus(400)
            }
        })
    
        db.get(`SELECT * FROM Instructions WHERE recipe_id=$id`, {$id: req.params.recipeId}, (err, instruction) => {
            if (err) {
                next(err)
            } else if (instruction) {
                res.sendStatus(400)
            }
        })

        db.run(`DELETE FROM Recipes WHERE id=$id`, {$id: req.params.recipeId}, (err) => {
            if (err) {
                next(err)
            } else {
                res.sendStatus(204)
            }
        })

    }) 
})

module.exports = recipesRouter;