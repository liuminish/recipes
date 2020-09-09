const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

// creation of cuisine types

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='CuisineTypes'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.serialize(function() {

            db.run("INSERT INTO CuisineTypes (type) VALUES ('chinese')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

            db.run("INSERT INTO CuisineTypes (type) VALUES ('filipino')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

            db.run("INSERT INTO CuisineTypes (type) VALUES ('thai')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

            db.run("INSERT INTO CuisineTypes (type) VALUES ('western')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

        })

    }
});

// creation of meal types

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='MealTypes'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.serialize(function() {

            db.run("INSERT INTO MealTypes (type) VALUES ('breakfast')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

            db.run("INSERT INTO MealTypes (type) VALUES ('desserts')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

            db.run("INSERT INTO MealTypes (type) VALUES ('dinner')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

            db.run("INSERT INTO MealTypes (type) VALUES ('snacks')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

        })

    }
});

// creation of cooking styles

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='CookingStyles'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.serialize(function() {

            db.run("INSERT INTO CookingStyles (type) VALUES ('easy')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

            db.run("INSERT INTO CookingStyles (type) VALUES ('instantpot')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

            db.run("INSERT INTO CookingStyles (type) VALUES ('panfry')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

            db.run("INSERT INTO CookingStyles (type) VALUES ('slowcook')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

            db.run("INSERT INTO CookingStyles (type) VALUES ('steamed')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

            db.run("INSERT INTO CookingStyles (type) VALUES ('vegetarian')", function(error) {
                if (error) {
                    throw new Error(error);
                }
            });

        })

    }
});

// creation of recipe 1

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Recipes'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.serialize(function() {

            let recipeId;
            db.run("INSERT INTO Recipes (name, image, time, servings, cuisine_type, meal_type, cooking_style, notes) VALUES ('Prawns Glass Noodles', '', 60, 2, '3', '3', '1,3', 'Best served when warm.')", function(error) {
                if (error) {
                    throw new Error(error);
                }
                recipeId = this.lastID;
            });

            db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Ingredients'", (error, table) => {
                if (error) {
                throw new Error(error);
                }
        
                if (table) {
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (300, 'millilitre', 'water', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (1, 'teaspoon', 'sugar', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (0.5, 'teaspoon', 'chicken stock powder', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (2, 'tablespoon', 'fish sauce', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (3, 'tablespoon', 'oyster sauce', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (1, 'tablespoon', 'dark soy sauce', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (1, 'tablespoon', 'sesame oil', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (300, 'gram', 'prawns', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (150, 'gram', 'tanghoon', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (40, 'gram', 'sliced ginger', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (1, 'whole', 'garlic smashed', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (0.5, 'tablespoon', 'ground white pepper', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (0.5, 'tablespoon', 'ground black pepper', ${recipeId})`);
                }
            });

            db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Instructions'", (error, table) => {
                if (error) {
                throw new Error(error);
                }
        
                if (table) {
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Soak prawns and tanghoon in marinade for 10-15 mins', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Heat up generous amount of oil in pan', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Pan fry prawns till 80% done, and remove prawns from pan', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Sautee ginger, garlic and cilantro roots till fragrant', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Add peppers in and sautee a bit more', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Put tanghoon in and half of marinade', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Put lid on for 1-2 min', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Put prawns in on top of tanghoon, add half of the remaining marinade (or to taste)', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Put lid on for 1-2 mins', ${recipeId})`);
                }

            });
        });
    }
});

// creation of recipe 2

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Recipes'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.serialize(function() {

            let recipeId;
            db.run("INSERT INTO Recipes (name, image, time, servings, cuisine_type, meal_type, cooking_style, notes) VALUES ('Chinese Steamed Egg', '', 13, 2, '1', '3', '1,5', 'Process of sieving is important.')", function(error) {
                if (error) {
                    throw new Error(error);
                }
                recipeId = this.lastID;
            });

            db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Ingredients'", (error, table) => {
                if (error) {
                throw new Error(error);
                }
        
                if (table) {
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (2, 'whole', 'egg', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (4, 'whole', 'eggshells filled with water', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (1, 'pinch', 'salt', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (1, 'teaspoon', 'chives', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (2, 'teaspoon', 'light soy sauce', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (1, 'drop', 'sesame oil', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (1, 'tablespoon', 'sesame oil', ${recipeId})`);
                }
            });

            db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Instructions'", (error, table) => {
                if (error) {
                throw new Error(error);
                }
        
                if (table) {
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Pour warm water into beaten eggs. Add salt then stir well', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Through a sieve, pour the mixture into 2 small serving bowls. Sprinkle chive over if using', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Cover the bowls with cling film. Pierce to allow the steam to escape', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Steam for 10 minutes over a gentle heat (place the bowls in when the water starts to boil)', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Season with light soy sauce and sesame oil (if you wish, cut through the curd several times to let the sauce penetrate) . Serve warm.', ${recipeId})`);
                }
            });
        });
    }
});

// creation of recipe 3

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Recipes'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.serialize(function() {

            let recipeId;
            db.run("INSERT INTO Recipes (name, image, time, servings, cuisine_type, meal_type, cooking_style, notes) VALUES ('Shrimp Paste Chicken', '', 13, 2, '1', '3', '3', 'Can be marinated for shorter period of time if there is no time.')", function(error) {
                if (error) {
                    throw new Error(error);
                }
                recipeId = this.lastID;
            });

            db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Ingredients'", (error, table) => {
                if (error) {
                throw new Error(error);
                }
        
                if (table) {
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (500, 'gram', 'chicken wings', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (4, 'whole', 'eggshells filled with water', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (0.25, 'cup', 'all purpose flour', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (0.25, 'cup', 'corn starch', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (0.25, 'cup', 'water', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (1, 'whole', 'egg beaten', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (0.25, 'teaspoon', 'baking soda', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (1, 'teaspoon', 'sugar', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (3, 'tablespoon', 'shrimp paste', ${recipeId})`);
                    db.run(`INSERT INTO Ingredients (amount, unit, ingredient, recipe_id) VALUES (1, 'tablespoon', 'oyster sauce', ${recipeId})`);
                }
            });

            db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Instructions'", (error, table) => {
                if (error) {
                throw new Error(error);
                }
        
                if (table) {
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Dissolve the sugar in hot water. Add shrimp paste and oyster sauce', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Marinate chicken in mariade sauce for 1-8 hours', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Prepare batter by mixing the cornstarch, flour, and baking powder in a bowl. Stir to mix. Crack in eggs and add water. Stir to mix until you get a smooth batter', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Get chicken out of the fridge 30 minutes before frying', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Heat up enough oil to cover chicken wings when frying', ${recipeId})`);
                    db.run(`INSERT INTO Instructions (instruction, recipe_id) VALUES ('Coat chicken in batter before frying. Remove from oil when chicken turns golden brown', ${recipeId})`);
                }
            });
        });
    }
});