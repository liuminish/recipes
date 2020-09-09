const express = require('express');
const instructionsRouter = express.Router({mergeParams: true});

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// route Param
instructionsRouter.param('instructionId', (req, res, next, id) => {
    db.get(`SELECT * FROM Instructions WHERE id=$id`, {$id: id}, (err, instruction) => {
        if (err) {
            next(err)
        } else if (!instruction) {
            res.sendStatus(404)
        } else {
            req.instruction = instruction;
            next()
        }
    })
})

// GET all instructions for specific recipe
instructionsRouter.get('/', (req, res, next) => {
    db.all(`SELECT * FROM Instructions WHERE recipe_id=$recipeId`, {$recipeId: req.params.recipeId}, (err, instructions) => {
        if (err) {
            next(err)
        } else {
            res.status(200).json({instructions: instructions})
        }
    })
})

// GET one instruction for specific recipe
instructionsRouter.get('/:instructionId', (req, res, next) => {
    res.status(200).json({instruction: req.instruction})
})

// POST/add one instruction for specific recipe
instructionsRouter.post('/', (req, res, next) => {
    const { instruction } = req.body.instructions;
    const sql = `INSERT INTO Instructions (instruction, recipe_id) VALUES ($instruction, $recipeId)`;
    const values = {$instruction: instruction, $recipeId: req.params.recipeId};

    db.run(sql, values, function(err) {
        if (err) {
            next(err)
        } else {
            db.get(`SElECT * FROM Instructions WHERE id=$id`, {$id: this.lastID}, (err, instruction) => {
                if (err) {
                    next(err)
                } else {
                    res.status(201).json({instruction: instruction})
                }
            })
        }
    })
})

// PUT/edit one instruction for specific recipe
instructionsRouter.put('/:instructionId', (req, res, next) => {
    const { instruction } = req.body.instructions;
    const sql = `UPDATE Instructions SET instruction=$instruction recipe_id=$recipeId`;
    const values = {$instruction: instruction, $recipeId: req.params.recipeId};

    db.run(sql, values, (err) => {
        if (err) {
            next(err)
        } else {
            db.get(`SELECT * FROM Instructions WHERE id=$id`, {$id: req.params.recipeId}, (err, instruction) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json({instruction: instruction})
                }
            })
        }
    })
})

// DELETE one instruction for specific recipe
instructionsRouter.delete('/:instructionId', (req, res, next) => {
    db.run(`DELETE FROM Instructions WHERE id=$id`, {$id: req.params.instructionId}, (err) => {
        if (err) {
            next(err)
        } else {
            res.sendStatus(204)
        }
    })
})

module.exports = instructionsRouter;