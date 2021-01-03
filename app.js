const express = require("express");
const db = require("./config/database");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());
app.use("/kybot/users", userRouter);

app.listen(3000,()=>{
    console.log("Server running at port 3000");
});