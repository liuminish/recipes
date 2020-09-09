const express = require('express');
const cuisinesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// route Param
cuisinesRouter.param('cuisinesId', (req, res, next, id) => {

    db.get(`SELECT * FROM CuisineTypes WHERE id=$id`, {$id: id}, (err, cuisineType) => {

        if (err) {
            next(err)
        } else {
            req.cuisineType = cuisineType;
            next()
        }

    })

})

// GET cuisine type
cuisinesRouter.get('/:cuisinesId', (req, res, next) => {

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
cuisinesRouter.put('/:cuisinesId', (req, res, next) => {
    
    const sql = `UPDATE CuisineTypes SET type=$type`;
    const values = {$type: req.body.type};

    db.run(sql, values, (err) => {
        if (err) {
            next(err)
        } else {
            db.get(`SELECT * FROM CuisineTypes WHERE id=$id`, {$id: req.params.cuisinesId}, (err, cuisineType) => {
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