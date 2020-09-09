const express = require('express');
const cuisinesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// route Param
cuisinesRouter.param('cuisineId', (req, res, next, id) => {

    db.get(`SELECT * FROM CuisineTypes WHERE id=$id`, {$id: id}, (err, cuisineType) => {

        if (err) {
            next(err)
        } else {
            req.cuisineType = cuisineType;
            next()
        }

    })

})

// GET all cuisine types
cuisinesRouter.get('/', (req, res, next) => {

    db.all(`SELECT * FROM CuisineTypes`, (err, cuisineTypes) => {

        if (err) {
            next(err)
        } else {
            res.status(200).json({cuisineTypes: cuisineTypes})
        }

    })

})  

// GET cuisine type
cuisinesRouter.get('/:cuisineId', (req, res, next) => {

    res.status(200).json(req.cuisineType)

})   

// POST/add cuisine type
cuisinesRouter.post('/', (req, res, next) => {

    const sql = `INSERT INTO CuisineTypes (type) VALUES ($type)`;
    const values = {$type: req.body.type};

    db.run(sql, values, function(err) {

        if (err) {
            next(err)
        } else {

            db.get(`SELECT * FROM CuisineTypes WHERE id=$id`, {$id: this.lastID}, (err, cuisineType) => {

                if (err) {
                    next(err)
                } else {
                    res.status(201).json(cuisineType)
                }

            })
        }

    })

})

// PUT/edit cuisine type
cuisinesRouter.put('/:cuisineId', (req, res, next) => {
    
    const sql = `UPDATE CuisineTypes SET type=$type`;
    const values = {$type: req.body.type};

    db.run(sql, values, (err) => {
        if (err) {
            next(err)
        } else {
            db.get(`SELECT * FROM CuisineTypes WHERE id=$id`, {$id: req.params.cuisineId}, (err, cuisineType) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json(cuisineType)
                }
            })
        }
    })
})

// DELETE cuisine type


module.exports = cuisinesRouter;