require("dotenv").config();
const express = require("express");
// const db = require("./config/database");
const app = express();
const userRouter = require("./api/users/user.router");
const memeRouter = require("./api/meme/meme.router");
const cron = require("node-cron");
const { pullLatestMemes } = require("./api/meme/meme.service");

app.use(express.json());

pullLatestMemes();

app.set("view engine", "ejs");

app.use("/users", userRouter);
app.use("/meme", memeRouter);

cron.schedule("0 0 * * *", pullLatestMemes);

app.listen(3000, () => {
    console.log("Server running at port 3000");
    console.debug("DEBUG MODE PLS NO PRODUCTION");
});
