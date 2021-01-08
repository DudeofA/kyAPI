const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { 
    createUser, 
    login,
    getUserByUserID, 
    getUsers, 
    deleteUser, 
    updateUser 
} = require("./user.controller");

router.post("/", createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserID);
router.post("/login", login);
router.patch("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);

module.exports = router;