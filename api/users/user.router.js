const { 
    createUser, 
    getUserByUserID, 
    getUsers, 
    deleteUser, 
    updateUser 
} = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserByUserID);
router.patch("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;