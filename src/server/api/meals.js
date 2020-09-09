const express = require('express');
const mealsRouter = express.Router({mergeParams: true});

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// route Param
mealsRouter.param('mealsId', (req, res, next, id) => {
    db.get(`SELECT * FROM MealTypes WHERE id=$id`, {$id: id}, (err, mealType) => {
        if (err) {
            next(err)
        } else {
            req.mealType = mealType;
            next()
        }
    })
})

// GET meal type for specific recipe
mealsRouter.get('/', (req, res, next) => {
    db.all(`SELECT * FROM MealTypes WHERE recipe_id=$recipeId`, {$recipeId: req.params.recipeId}, (err, mealType) => {
        if (err) {
            next(err)
        } else {
            res.status(200).json({mealType: mealType})
        }
    })
})   

// POST/add one meal type for specific recipe
mealsRouter.post('/', (req, res, next) => {
    const { breakfast, desserts, dinner, snacks } = req.body.mealType;
    const sql = `INSERT INTO MealTypes (breakfast, desserts, dinner, snacks, recipe_id) VALUES ($breakfast, $desserts, $dinner, $snacks, $recipe_id)`;
    const values = {$breakfast: breakfast, $desserts: desserts, $dinner: dinner, $snacks: snacks, $recipe_id: req.params.recipeId};

    db.run(sql, values, function(err) {
        if (err) {
            next(err)
        } else {
            db.get(`SELECT * FROM MealTypes WHERE id=$id`, {$id: this.lastID}, (err, mealType) => {
                if (err) {
                    next(err)
                } else {
                    res.status(201).json({mealType: mealType})
                }
            })
        }
    })
})

// PUT/edit one meal type for specific recipe
mealsRouter.put('/:mealsId', (req, res, next) => {
    const { breakfast, desserts, dinner, snacks } = req.body.mealType;
    const sql = `UPDATE MealTypes SET breakfast=$breakfast desserts=$desserts dinner=$dinner snacks=$snacks recipe_id=$recipeId`;
    const values = {$breakfast: breakfast, $desserts: desserts, $dinner: dinner, $snacks: snacks, $recipe_id: req.params.recipeId};

    db.run(sql, values, (err) => {
        if (err) {
            next(err)
        } else {
            db.get(`SELECT * FROM MealTypes WHERE id=$id`, {$id: req.params.mealsId}, (err, mealType) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json({mealType: mealType})
                }
            })
        }
    })
})

// DELETE meal type for specific recipe
mealsRouter.delete('/:mealsId', (req, res, next) => {
    db.run(`DELETE FROM MealTypes WHERE id=$id`, {$id: req.params.mealsId}, (err) => {
        if (err) {
            next(err)
        } else {
            res.sendStatus(204)
        }
    })
})

module.exports = mealsRouter;