const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS Recipes`)
    db.run(`CREATE TABLE Recipes (
        id INTEGER NOT NULL,
        name TEXT NOT NULL,
        image TEXT DEFAULT '',
        time INTEGER NOT NULL,
        servings INTEGER NOT NULL,
        cuisine_type TEXT NOT NULL,
        meal_type TEXT NOT NULL,
        cooking_style TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        notes TEXT,
        PRIMARY KEY (id)
        )`)
})

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS CuisineTypes`)
    db.run(`CREATE TABLE CuisineTypes (
        id INTEGER NOT NULL,
        type TEXT NOT NULL,
        PRIMARY KEY (id)
        )`)
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

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS MealTypes`)
    db.run(`CREATE TABLE MealTypes (
        id INTEGER NOT NULL,
        type TEXT NOT NULL,
        PRIMARY KEY (id)
        )`)
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

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS CookingStyles`)
    db.run(`CREATE TABLE CookingStyles (
        id INTEGER NOT NULL,
        type TEXT NOT NULL,
        PRIMARY KEY (id)
        )`)
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

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS Units`)
    db.run(`CREATE TABLE Units (
        id INTEGER NOT NULL,
        type TEXT,
        PRIMARY KEY (id)
        )`)
    db.run("INSERT INTO Units (type) VALUES ('')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('teaspoon')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('tablespoon')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('cup')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('drop')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('dash')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('millilitre')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('litre')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('gram')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('kilogram')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('pinch')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('stalk')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('clove')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('slice')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('piece')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });
    db.run("INSERT INTO Units (type) VALUES ('whole')", function(error) {
        if (error) {
            throw new Error(error);
        }
    });

})
