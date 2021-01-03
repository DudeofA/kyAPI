const { 
    createUser, 
    getUserByUserID, 
    getUsers, 
    updateUser, 
    deleteUser 
} = require("./user.service");

module.exports = {
    createUser: (req, res) => {
        createUser(req.body, (err, results) => {
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
        updateUser(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!result) {
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                });
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