const db = require("../../config/database");

module.exports = {
    createUser: (data, callBack) => {
        db.run(
            `INSERT INTO users(userID,name,discriminator,currentCID,lastSeenCID,credits,dailiesDone) VALUES(?,?,?,?,?,?,?)`,
            [
                data.userID,
                data.name,
                data.discriminator,
                data.currentCID,
                data.lastSeenCID,
                data.credits,
                data.dailiesDone
            ], 
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return callBack(err);
                }
                return callBack(null,results);
          });
    },

    getUsers: callBack => {
        db.all(
            `SELECT * FROM users`,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserByUserID: (id, callBack) => {
        db.all(
            `SELECT * FROM users WHERE userID = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateUser: (data, callBack) => {
        db.run(
            `UPDATE users SET name=?, discriminator=?, currentCID=?, lastSeenCID=?, credits=?, dailiesDone=? WHERE userID=?`,
            [
                data.name,
                data.discriminator,
                data.currentCID,
                data.lastSeenCID,
                data.credits,
                data.dailiesDone,
                data.userID
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );    
    },

    getUserByUserID: (id, callBack) => {
        db.all(
            `SELECT * FROM users WHERE userID = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteUser: (data, callBack) => {
        db.run(
            `DELETE FROM users WHERE userID=?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }


};