const express = require('express');
const ingredientsRouter = express.Router({mergeParams: true});

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// router Param
ingredientsRouter.param('ingredientId', (req, res, next, id) => {
    const sql = `SELECT * FROM Ingredients WHERE Ingredients.id=$id`;
    const values = {$id: req.params.ingredientId, $recipeId: req.params.recipeId};

    db.get(sql, values, (err, ingredient) => {
        if (err) {
            next(err)
        } else if (!ingredient) {
            res.sendStatus(404)
        } else {
            req.ingredient = ingredient;
            next()
        }
    })
})

// GET all ingredients for specific recipe
ingredientsRouter.get('/', (req, res, next) => {
    db.all(`SELECT * FROM Ingredients WHERE Ingredients.recipe_id=$recipeId`, {$recipeId: req.params.recipeId}, (err, ingredients) => {
        if (err) {
            next(err)
        } else {
            res.status(200).json({ingredients: ingredients})
        }
    })
})


// POST/add all ingredients for specific recipe
ingredientsRouter.post('/', (req, res, next) => {

    req.body.ingredients.map(ingredient => {
        const { amount, unit, ingredient } = ingredient;
        const sql = `INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES ($amount, $unit, $ingredient, $recipeId)`;
        const values = {$amount: amount, $unit: unit, $ingredient: ingredient, $recipeId: req.params.recipeId};

        db.run(sql, values, function(err) {
            if (err) {
                next(err)
            } else {
                db.get(`SELECT * FROM Ingredients WHERE Ingredients.id=$id`, {$id: this.lastID}, function(err, ingredient) {
                    if (err) {
                        next(err)
                    } else {
                        res.status(201).json({ingredient: ingredient})
                    }
                })
            }
        })
    })

})

// PUT/update one ingredient for specific recipe
ingredientsRouter.put('/:ingredientId', (req, res, next) => {
    const { amount, unit, ingredient } = req.body.ingredient
    const sql = `UPDATE Ingredients SET amount=$amount unit=$unit ingredient=$ingredient`;
    const values = {$amount: amount, $unit: unit, $ingredient: ingredient};

    db.run(sql, values, (err) => {
        if (err) {
            next(err)
        } else {
            db.get(`SELECT * FROM Ingredients WHERE Ingredients.id=$id `, {$id: req.params.ingredientId}, (err, ingredient) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json({ingredient: ingredient})
                }
            })
        }
    })
})

// DELETE one ingredient for specific recipe
ingredientsRouter.delete('/:ingredientId', (req, res, next) => {
    db.run(`DELETE FROM Ingredients WHERE Ingredients.id=$id`, {$id: req.params.ingredientId}, (err) => {
        if (err) {
            next(err)
        } else {
            res.sendStatus(204)
        }
    })
})

module.exports = ingredientsRouter;