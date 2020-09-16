const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

// creation of recipe 1

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Recipes'", (error, table) => {
    if (error) {
        throw new Error(error);
    }
    
    if (table) {
        db.run(`INSERT INTO Recipes (name, image, time, servings, cuisine_type, meal_type, cooking_style, ingredients, instructions, notes) 
        VALUES ('Prawns Glass Noodles', '', 60, 2, '3', '3', '1,3',

            '300-millilitre-water,
            1-teaspoon-sugar,
            0.5-teaspoon-chicken stock powder,
            2-tablespoon-fish sauce,
            3-tablespoon-oyster sauce,
            1-tablespoon-dark soy sauce,
            1-tablespoon-sesame oil,
            300-gram-prawns,
            150-gram-tanghoon,
            40-gram-sliced ginger,
            1-whole-garlic smashed,
            0.5-tablespoon-ground white pepper,
            0.5-tablespoon-ground black pepper',

            
            'Soak prawns and tanghoon in marinade for 10-15 mins.&Heat up generous amount of oil in pan.&Pan fry prawns till 80% done, and remove prawns from pan.&Sautee ginger, garlic and cilantro roots till fragrant.&Add peppers in and sautee a bit more.&Put tanghoon in and half of marinade.&Put lid on for 1-2 min.&Put prawns in on top of tanghoon, add half of the remaining marinade (or to taste).&Put lid on for 1-2 mins.',
            'Best served when warm.')`
        );
    };
});

// creation of recipe 2

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Recipes'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.run(`INSERT INTO Recipes (name, image, time, servings, cuisine_type, meal_type, cooking_style, ingredients, instructions, notes) 
        VALUES ('Chinese Steamed Egg', '', 13, 2, '1', '3', '1,5', 

            '2-whole-egg,
            4-whole-eggshells filled with water,
            1-pinch-salt,
            1-teaspoon-chives,
            2-teaspoon-light soy sauce,
            1-drop-sesame oil,
            1-tablespoon-sesame oil',

            'Pour warm water into beaten eggs.&Add salt then stir well.&Through a sieve, pour the mixture into 2 small serving bowls.&Sprinkle chive over if using.&Cover the bowls with cling film.&Pierce to allow the steam to escape.&Steam for 10 minutes over a gentle heat (place the bowls in when the water starts to boil).&Season with light soy sauce and sesame oil (if you wish, cut through the curd several times to let the sauce penetrate) and serve warm.',
            'Process of sieving is important.')`
        )
    }
});

// creation of recipe 3

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Recipes'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.run(`INSERT INTO Recipes (name, image, time, servings, cuisine_type, meal_type, cooking_style, ingredients, instructions, notes)
            VALUES ('Shrimp Paste Chicken','', 13, 2, '1', '3', '3',
            
                '500-gram-chicken wings,
                4-whole-eggshells filled with water,
                0.25-cup-all purpose flour,
                0.25-cup-corn starch,
                0.25-cup-water,
                1-whole-egg beaten,
                0.25-teaspoon-baking soda,
                1-teaspoon-sugar,
                3-tablespoon-shrimp paste,
                1-tablespoon-oyster sauce',

                'Dissolve the sugar in hot water.&Add shrimp paste and oyster sauce.&Marinate chicken in mariade sauce for 1-8 hours.&Prepare batter by mixing the cornstarch, flour, baking powder, eggs and water in a bowl.&Get chicken out of the fridge 30 minutes before frying.&Heat up enough oil to cover chicken wings when frying.&Coat chicken in batter before frying.&Remove from oil when chicken turns golden brown.',
                
                'Can be marinated for shorter period of time if there is no time.')
        `)
                
    }
});