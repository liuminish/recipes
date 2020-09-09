const express = require('express');
const stylesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// route Param
stylesRouter.param('styleId', (req, res, next, id) => {

    db.get(`SELECT * FROM CookingStyles WHERE id=$id`, {$id: id}, (err, cookingStyle) => {

        if (err) {
            next(err)
        } else {
            req.cookingStyle = cookingStyle;
            next()
        }

    })

})

// GET all cooking styles
stylesRouter.get('/', (req, res, next) => {

    db.all(`SELECT * FROM CookingStyles`, (err, cookingStyles) => {

        if (err) {
            next(err)
        } else {
            res.status(200).json({cookingStyles: cookingStyles})
        }

    })

}) 

// GET cooking style
stylesRouter.get('/:styleId', (req, res, next) => {

    res.status(200).json(req.cookingStyle)

})   

// POST/add cooking style
stylesRouter.post('/', (req, res, next) => {

    const sql = `INSERT INTO CookingStyles (type) VALUES ($type)`;
    const values = {$type: req.body.type};

    db.run(sql, values, function(err) {

        if (err) {
            next(err)
        } else {

            db.get(`SELECT * FROM CookingStyles WHERE id=$id`, {$id: this.lastID}, (err, cookingStyle) => {

                if (err) {
                    next(err)
                } else {
                    res.status(201).json(cookingStyle)
                }

            })
        }

    })

})

// PUT/edit cooking style
stylesRouter.put('/:styleId', (req, res, next) => {
    
    const sql = `UPDATE CookingStyles SET type=$type`;
    const values = {$type: req.body.type};

    db.run(sql, values, (err) => {
        if (err) {
            next(err)
        } else {
            db.get(`SELECT * FROM CookingStyles WHERE id=$id`, {$id: req.params.styleId}, (err, cookingStyle) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json(cookingStyle)
                }
            })
        }
    })
})

// DELETE cooking style


module.exports = stylesRouter;