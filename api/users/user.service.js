const db = require("../../config/database");

module.exports = {
    createUser: (data, callBack) => {
        db.run(
            `insert into registration(id, firstName, lastName, gender, email, password) values(NULL,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password
            ], 
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return callBack(err);
                }
                return callBack(null,results);
            }
        );
    },

    getUserByUserEmail: (email, callBack) => {
        db.all(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    allBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
        
    getUserByUserID: (id, callBack) => {
        db.all(
            `select * from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
        
    getUsers: callBack => {
        db.all(
            `select * from registration`,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateUser: (data, callBack) => {
        db.run(
            `update registration set firstName=?, lastName=?, gender=?, email=?, password=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.id
            ],
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
            `delete from registration where id = ?`,
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