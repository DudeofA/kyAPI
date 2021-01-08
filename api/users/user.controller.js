const { 
    createUser, 
    getUserByUserEmail,
    getUserByUserID, 
    getUsers, 
    updateUser, 
    deleteUser 
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);

        createUser(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    login: (req, res) => {
        getUserByUserEmail(req.body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(req.body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Login successfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    },

    getUserByUserID: (req, res) => {
        const id = req.params.id;
        getUserByUserID(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!results) {
                return res.json({
                    sucess: 0,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    updateUser: (req, res) => {
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);
        updateUser(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.status(200).json({
                success: 1,
                message: "Updated user successfully"
            });
        });
    },

    deleteUser: (req, res) => {
        deleteUser(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!results) {
                return res.json({
                    success: 0,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "User deleted successfully"
            });
        });
    },
}