const express = require('express');
const unitsRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// route Param
unitsRouter.param('unitId', (req, res, next, id) => {

    db.get(`SELECT * FROM Units WHERE id=$id`, {$id: id}, (err, unit) => {

        if (err) {
            next(err)
        } else {
            req.unit = unit;
            next()
        }

    })

})

// GET all units
unitsRouter.get('/', (req, res, next) => {

    db.all(`SELECT * FROM Units`, (err, units) => {

        if (err) {
            next(err)
        } else {
            res.status(200).json({units: units})
        }

    })

}) 

// GET unit
unitsRouter.get('/:unitId', (req, res, next) => {

    res.status(200).json(req.unit)

})   

// POST/add unit
unitsRouter.post('/', (req, res, next) => {

    const sql = `INSERT INTO Units (type) VALUES ($type)`;
    const values = {$type: req.body.type};

    db.run(sql, values, function(err) {

        if (err) {
            next(err)
        } else {

            db.get(`SELECT * FROM Units WHERE id=$id`, {$id: this.lastID}, (err, unit) => {

                if (err) {
                    next(err)
                } else {
                    res.status(201).json(unit)
                }

            })
        }

    })

})

// PUT/edit unit
unitsRouter.put('/:unitId', (req, res, next) => {
    
    const sql = `UPDATE Units SET type=$type`;
    const values = {$type: req.body.type};

    db.run(sql, values, (err) => {
        if (err) {
            next(err)
        } else {
            db.get(`SELECT * FROM Units WHERE id=$id`, {$id: req.params.unitId}, (err, unit) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json(unit)
                }
            })
        }
    })
})

// DELETE unit

module.exports = unitsRouter;