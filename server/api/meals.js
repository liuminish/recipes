const express = require('express');
const mealsRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// route Param
mealsRouter.param('mealId', (req, res, next, id) => {

    db.get(`SELECT * FROM MealTypes WHERE id=$id`, {$id: id}, (err, mealType) => {

        if (err) {
            next(err)
        } else {
            req.mealType = mealType;
            next()
        }

    })

})

// GET all meal types
mealsRouter.get('/', (req, res, next) => {

    db.all(`SELECT * FROM MealTypes`, (err, mealTypes) => {

        if (err) {
            next(err)
        } else {
            res.status(200).json({mealTypes: mealTypes})
        }

    })

}) 

// GET meal type
mealsRouter.get('/:mealId', (req, res, next) => {

    res.status(200).json(req.mealType)

})   

// POST/add meal type
mealsRouter.post('/', (req, res, next) => {

    const sql = `INSERT INTO MealTypes (type) VALUES ($type)`;
    const values = {$type: req.body.type};

    db.run(sql, values, function(err) {

        if (err) {
            next(err)
        } else {

            db.get(`SELECT * FROM MealTypes WHERE id=$id`, {$id: this.lastID}, (err, mealType) => {

                if (err) {
                    next(err)
                } else {
                    res.status(201).json(mealType)
                }

            })
        }

    })

})

// PUT/edit meal type
mealsRouter.put('/:mealId', (req, res, next) => {
    
    const sql = `UPDATE MealTypes SET type=$type`;
    const values = {$type: req.body.type};

    db.run(sql, values, (err) => {
        if (err) {
            next(err)
        } else {
            db.get(`SELECT * FROM MealTypes WHERE id=$id`, {$id: req.params.mealId}, (err, mealType) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json(mealType)
                }
            })
        }
    })
})

// DELETE meal type

module.exports = mealsRouter;