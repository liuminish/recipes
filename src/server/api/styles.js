const express = require('express');
const stylesRouter = express.Router({mergeParams: true});

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// route Param
stylesRouter.param('stylesId', (req, res, next, id) => {
    db.get(`SELECT * FROM StyleTypes WHERE id=$id`, {$id: id}, (err, styleType) => {
        if (err) {
            next(err)
        } else {
            req.styleType = styleType;
            next()
        }
    })
})

// GET one cuisine type for specific recipe
stylesRouter.get('/', (req, res, next) => {
    db.all(`SELECT * FROM CookingStyles WHERE recipe_id=$recipeId`, {$recipeId: req.params.recipeId}, (err, cookingStyle) => {
        if (err) {
            next(err)
        } else {
            res.status(200).json({cookingStyle: cookingStyle})
        }
    })
})   

// POST/add one cuisine type for specific recipe
stylesRouter.post('/', (req, res, next) => {
    const { easy, instantpot, panfry, slowcook, vegetarian } = req.body.styleType;
    const sql = `INSERT INTO StyleTypes (easy, instantpot, panfry, slowcook, vegetarian, recipe_id) VALUES ($easy, $instantpot, $panfry, $slowcook, $vegetarian, $recipe_id)`;
    const values = {$easy: easy, $instantpot: instantpot, $panfry: panfry, $slowcook: slowcook, $vegetarian: vegetarian, $recipe_id: req.params.recipeId};

    db.run(sql, values, function(err) {
        if (err) {
            next(err)
        } else {
            db.get(`SELECT * FROM StyleTypes WHERE id=$id`, {$id: this.lastID}, (err, styleType) => {
                if (err) {
                    next(err)
                } else {
                    res.status(201).json({styleType: styleType})
                }
            })
        }
    })
})

// PUT/edit one cuisine type for specific recipe
stylesRouter.put('/:stylesId', (req, res, next) => {
    const { easy, instantpot, panfry, slowcook } = req.body.styleType;
    const sql = `UPDATE StyleTypes SET easy=$easy instantpot=$instantpot panfry=$panfry slowcook=$slowcook vegetarian=$vegetarian recipe_id=$recipeId`;
    const values = {$easy: easy, $instantpot: instantpot, $panfry: panfry, $slowcook: slowcook, $vegetarian: vegetarian, $recipe_id: req.params.recipeId};

    db.run(sql, values, (err) => {
        if (err) {
            next(err)
        } else {
            db.get(`SELECT * FROM StyleTypes WHERE id=$id`, {$id: req.params.stylesId}, (err, styleType) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json({styleType: styleType})
                }
            })
        }
    })
})

// DELETE cuisine type for specific recipe
stylesRouter.delete('/:stylesId', (req, res, next) => {
    db.run(`DELETE FROM StyleTypes WHERE id=$id`, {$id: req.params.stylesId}, (err) => {
        if (err) {
            next(err)
        } else {
            res.sendStatus(204)
        }
    })
})

module.exports = stylesRouter;