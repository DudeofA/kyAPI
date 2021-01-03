const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/ky.db', (err) => {
    if (err) throw err;

    console.log('Connected to the ky database.');
  });

// Initialize database
db.serialize(function () {
    db.all("SELECT name from sqlite_master where type='table'", function (err, tables) {
        if (tables === undefined || tables.length == 0) {
            // Generate new clean database
            console.log("Database empty, generating template...")
            db.run(`CREATE TABLE users(
                userID text,
                name text,
                discriminator text,
                currentCID text,
                lastSeenCID text,
                credits integer,
                dailiesDone integer
            )`, (err, result) => {
                if (err) throw err;
                console.log("User table created!");
            });
        }
    });
});

module.exports = db;