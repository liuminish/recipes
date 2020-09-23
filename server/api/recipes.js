const express = require('express');
const cors = require('cors');
const recipesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const fileupload = require('express-fileupload');
recipesRouter.use(fileupload())

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

// GET number of recipes
recipesRouter.get('/total', (req, res, next) => {

    db.all(`SELECT COUNT(*) FROM Recipes`, (err, total) => {

        if (err) {
            next(err)
        } else {
            res.status(200).send(total)
        }

    })

})


// GET all recipes 
recipesRouter.get('/', (req, res, next) => {

    if (req.query) {
        const name = req.query.name ? req.query.name : '';

        // search with type filters
        if (req.query.cuisineType) {
            const { cuisineType, mealType, cookingStyle } = req.query;
            let sqlCuisine = '';
            let sqlMeal = '';
            let sqlStyle = '';

            if (Array.isArray(cuisineType)) {
                sqlCuisine = cuisineType.reduce((acc, curr) => {
                    const str = `cuisine_type LIKE '%${curr}%'`
                    
                    if (acc) {
                        return acc = `${acc} OR ${str}`
                    } else
                    return str
    
                }, '');
            } else {
                sqlCuisine = `cuisine_type LIKE '%${cuisineType}%'`
            }

            if (Array.isArray(mealType)) {
                sqlMeal = mealType.reduce((acc, curr) => {
                    const str = `meal_type LIKE '%${curr}%'`
                    
                    if (acc) {
                        return acc = `${acc} OR ${str}`
                    } else
                    return str
    
                }, '');
            } else {
                sqlMeal = `meal_type LIKE '%${mealType}%'`
            }
                
            if (Array.isArray(cookingStyle)) {
                sqlStyle = cookingStyle.reduce((acc, curr) => {
                    const str = `cooking_style LIKE '%${curr}%'`
                    
                    if (acc) {
                        return acc = `${acc} OR ${str}`
                    } else
                    return str
    
                }, '');
            } else {
                sqlStyle = `cooking_style LIKE '%${cookingStyle}%'`
            }
            
            const sql = `SELECT * FROM Recipes WHERE name LIKE '%${name}%' AND (${sqlCuisine}) AND (${sqlMeal}) AND (${sqlStyle})`;

            db.all(sql, (err, recipes) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json({recipes: recipes})
                }
            })
        } 

        // search with ingredient filters
        else if (req.query.inclIngre || req.query.exclIngre) {
            const { inclIngre, exclIngre } = req.query;
            let sqlInclIngre = '';
            let sqlExclIngre = '';

            if (Array.isArray(inclIngre)) {
                sqlInclIngre = inclIngre.reduce((acc, curr) => {
                    const str = `ingredients LIKE '%${curr}%'`
                    
                    if (acc) {
                        return acc = `${acc} OR ${str}`
                    } else
                    return str
    
                }, '');
            } else {
                sqlInclIngre = `ingredients LIKE '%${inclIngre}%'`
            }
            
            if (Array.isArray(exclIngre)) {
                sqlExclIngre = exclIngre.reduce((acc, curr) => {
                    const str = `ingredients NOT LIKE '%${curr}%'`
                    
                    if (acc) {
                        return acc = `${acc} AND ${str}`
                    } else
                    return str
    
                }, '');
            } else {
                sqlExclIngre = `ingredients NOT LIKE '%${exclIngre}%'`
            }
            
            
            const sql = `SELECT * FROM Recipes WHERE name LIKE '%${name}%' AND (${sqlInclIngre}) AND ${sqlExclIngre}`;
            console.log(sql);
            
            db.all(sql, (err, recipes) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json({recipes: recipes})
                }
            })
        }

        // name search with no filters
        else if (!req.query.ingredients && !req.query.cuisine) {
            const sql = `SELECT * FROM Recipes WHERE name LIKE '%${name}%'`;
            
            db.all(sql, (err, recipes) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json({recipes: recipes})
                }
            })
        }
    }
    
    // no search
    else { 
        db.all(`SELECT * FROM Recipes`, (err, recipes) => {

            if (err) {
                next(err)
            } else {
                res.status(200).json({recipes: recipes})
            }
    
        })
    }
    
})


// GET one recipe 
recipesRouter.get('/:recipeId', (req, res, next) => {
    res.status(200).json({recipe: req.recipe})
})

// POST/add one recipe
recipesRouter.post('/', (req, res, next) => {

    const { name, image, time, servings, cuisineTypes, mealTypes, cookingStyles, ingredients, instructions, notes } = req.body.recipe;
    

    const sql = `INSERT INTO Recipes (name, image, time, servings, cuisine_type, meal_type, cooking_style, ingredients, instructions, notes) VALUES ($name, $image, $time, $servings, $cuisineTypes, $mealTypes, $cookingStyles, $ingredients, $instructions, $notes)`;
    const values = {$name: name, $image: image, $time: time, $servings: servings, $cuisineTypes: cuisineTypes, $mealTypes: mealTypes, $cookingStyles: cookingStyles, $ingredients: ingredients, $instructions: instructions, $notes: notes};

    if (!name || !time || !servings || !cuisineTypes || !mealTypes || !cookingStyles || !ingredients || !instructions) {
        res.sendStatus(400)
    } else {
        db.run(sql, values, function(err) {

            if (err) {
                next(err)
            } else {

                // retrieving last posted recipe
                db.get(`SELECT * FROM Recipes WHERE id=$id`, {$id: this.lastID}, function(err, recipe) {
                    if (err) {
                        next(err)
                    } else {
                        res.status(201).json({recipe: recipe});
                    }
                })
            }
        })
    }
    
})

// PUT/update one recipe
recipesRouter.put('/:recipeId', (req, res, next) => {

    const { name, image, time, servings, cuisineTypes, mealTypes, cookingStyles, ingredients, instructions, notes } = req.body.recipe;
    const sql = `UPDATE Recipes SET name=$name, image=$image, time=$time, servings=$servings, cuisine_type=$cuisineTypes, meal_type=$mealTypes, cooking_style=$cookingStyles, ingredients=$ingredients, instructions=$instructions, notes=$notes WHERE id=$id`;
    const values = {$id: req.params.recipeId, $name: name, $image: image, $time: time, $servings: servings, $cuisineTypes: cuisineTypes, $mealTypes: mealTypes, $cookingStyles: cookingStyles, $ingredients: ingredients, $instructions: instructions, $notes: notes};

    if (!name || !time || !servings || !cuisineTypes || !mealTypes || !cookingStyles || !ingredients || !instructions) {
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
    
    db.run(`DELETE FROM Recipes WHERE id=$id`, {$id: req.params.recipeId}, (err) => {
        if (err) {
            next(err)
        } else {
            res.sendStatus(204)
        }
    })

})

// POST/add one image
recipesRouter.post('/uploadImage', (req, res, next) => {
    console.log('hello');

    const fileName = req.files.myImage.name;
    let path = '/images/' + fileName;

    req.files.myImage.mv(path, (err) => {
        if (err) {
            next(err)
        } else {
            res.status(201).json({path: path})
        }
    })
})

module.exports = recipesRouter;