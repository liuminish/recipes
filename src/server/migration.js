const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS Recipes`)
    db.run(`CREATE TABLE Recipes (
        id INTEGER NOT NULL,
        name TEXT NOT NULL,
        image TEXT,
        time INTEGER NOT NULL,
        servings INTEGER NOT NULL,
        cuisine_type TEXT NOT NULL,
        meal_type TEXT NOT NULL,
        cooking_style TEXT NOT NULL,
        notes TEXT,
        PRIMARY KEY (id)
        )`)
})

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS MealTypes`)
    db.run(`CREATE TABLE MealTypes (
        id INTEGER NOT NULL,
        type TEXT NOT NULL,
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
})

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS CookingStyles`)
    db.run(`CREATE TABLE CookingStyles (
        id INTEGER NOT NULL,
        type TEXT NOT NULL,
        PRIMARY KEY (id)
        )`)
})

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS Ingredients`)
    db.run(`CREATE TABLE Ingredients (
        id INTEGER NOT NULL,
        amount INTEGER NOT NULL,
        unit TEXT NOT NULL,
        ingredient TEXT NOT NULL,
        recipe_id INTEGER NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (recipe_id) REFERENCES Recipes (id)
        )`)
})

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS Instructions`)
    db.run(`CREATE TABLE Instructions (
        id INTEGER NOT NULL,
        instruction TEXT NOT NULL,
        recipe_id INTEGER NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (recipe_id) REFERENCES Recipes (id)
        )`)
})