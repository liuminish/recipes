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

// creation of recipe 4

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Recipes'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.run(`INSERT INTO Recipes (name, image, time, servings, cuisine_type, meal_type, cooking_style, ingredients, instructions, notes)
            VALUES ('Chinese Chicken and Mushroom Soup','', 150, 4, '1', '3', '1,2',
            
                '10-whole-dried shitake mushrooms,
                6-cup-water,
                2-tablespoon-goji berries,
                8-piece-dried red dates,
                900-gram-chicken,
                3-slice-ginger,
                2-whole-carrots,
                1-stalk-spring onion,
                2-tablespoon-shaoxing wine,
                1-pinch-salt',

                'Wash the shiitake mushrooms and soak it in the water overnight in the pot. After soaking, trim the stem and return to the pot.&Cut the chicken meat into bite size and marinate overnight with 1 tbsp Shaoxing wine.&In the pot with mushrooms, add goji berries and red dates, then bring to boil.&Once boiling, turn the heat down to simmer for 30 mins.&Add carrots, ginger and chicken and bring back to boil.&Simmer the soup for another 30 mins, then add the remaining Shaoxing wine and chopped spring onions.&Add salt to taste and serve garnished with curled spring onions.',
                
                '')
        `)
                
    }
});

// creation of recipe 5

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Recipes'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.run(`INSERT INTO Recipes (name, image, time, servings, cuisine_type, meal_type, cooking_style, ingredients, instructions, notes)
            VALUES ('Braised Mushroom and Pork Belly','', 30, 4, '1', '3', '1,2',
            
                '2-tablespoon-dark soy sauce,
                2-tablespoon-light soy sauce,
                1-piece-cinnamon stick,
                2-piece-star anise,
                3-slice-ginger,
                500-gram-pork belly,
                6-clove-garlic,
                8-whole-dried shitake mushrooms,
                500-millilitre-water',

                'Cut pork belly into bite-sized pieces. Lightly pound the garlic with mortar and pestle with skin on. Soak dried shitake mushrooms overnight and cut into halves or quarters.&Bring a pot of water to a boil in a large pot. Place the pork belly in the pot, blanching for 3-5 mins. Leave to the side.&Heat up a wok and add some oil. Saute the ginger and garlic until the aromas are released.&Add the pork and mushrooms to the wok mixture. Add the light soy sauce and dark soy sauce. Stir-fry for 2-3 mins.&Add the water, cinnamon and star anise.&Stir often to ensure everything is mixed well. Bring to a boil.&Transfer the wok mixture to a big pot. Cover with a lid and leave to simmer for approximately 1 hr until both the pork are tender.&Garnish with spring onion and serve while hot.',
                
                '')
        `)
                
    }
});

// creation of recipe 7

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Recipes'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.run(`INSERT INTO Recipes (name, image, time, servings, cuisine_type, meal_type, cooking_style, ingredients, instructions, notes)
            VALUES ('Cantonese Pork Knuckles with Ginger and Vinegar','', 180, 4, '1', '3', '1,2',
            
                '450-gram-ginger,
                1200-millilitre-chinese sweet vinegar,
                120-millilitre-chinese black vinegar,
                1-kilogram-pork trotter,
                2-tablespoon-shaoxing wine,
                6-whole-hardboiled eggs,
                1-pinch-salt',

                'Use the back of a paring knife or spoon to scrape the skin off the ginger, keeping the ginger in large pieces. Once peeled, rinse them clean and wipe them thoroughly dry. Lightly smash each chunk with the side of a knife or other flat, heavy tool.&In a clean, dry wok over medium heat, cook the ginger for 10 minutes. Be careful not to burn it. If any of the ginger burns, trim away the burnt spots, or the finished dish will be bitter.&Add the ginger chunks to a large non-reactive cooking vessel, along with the two types of vinegar. Cover and bring to a boil. Once boiling, turn the heat down to medium. Simmer for 90 minutes. This is a good time to taste the vinegar mixture––free feel to add more black vinegar for tartness.&While the vinegar and ginger are simmering, take a separate pot and add the pork. Cover it with cold water, and add 2 tablespoons Shaoxing wine. Bring to a boil and boil for an additional 3 minutes. Turn off the heat, drain, and rinse the pork. Set aside.&Once the vinegar and ginger have simmered for 90 minutes, stir in the pork. (If you prepared the vinegar and ginger base in advance, bring it to a boil before adding the pork.)&Cover and cook for another 60-90 minutes over medium heat. Youʼll know itʼs done when you can easily poke through the pork skin with a chopstick.&While the pig trotters and pork knuckles are cooking, boil the eggs. We came across this rigorously tested method Serious Eats. Bring 3 quarts of water to a boil in a large pot (it sounds like a lot, but it helps get the eggs to the right temperature to be easy to peel). Lower the eggs into the boiling water, and boil for 30 seconds. Cover the pot, reduce the heat to low, and simmer for 1 1 minutes. Transfer to a bowl of ice water. Once cool, tap the eggs against the counter all over to crack the shell, and peel under a thin stream of running water.&Once the pig trotters have reached an ideal doneness, carefully submerge the peeled eggs and bring everything to a boil. Turn off the heat, and let it sit overnight. The next day, reheat, salt to taste, and serve hot.',
                
                '')
        `)
                
    }
});