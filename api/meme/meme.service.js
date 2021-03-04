const axios = require("axios");
const qs = require("qs");
const fs = require("fs/promises");
const path = require("path");

module.exports = {
    createMeme: async function (memeID, toptext, bottext, callBack) {
        let meme = memeID;
        if (meme == null) {
            let rawMemeData = await fs.readFile(
                path.join(__dirname, "../..", "cache", "hotmemes.json")
            );
            memeData = JSON.parse(rawMemeData);
            meme = memeData.data.memes[Math.floor(Math.random() * memeData.data.memes.length)].id;
            toptext = "sample";
            bottext = "text";
        }
        if (toptext == null) {
            toptext = "";
        }
        if (bottext == null) {
            bottext = "";
        }

        const data = {
            template_id: meme,
            username: "kylixor",
            password: process.env.KYIMGFLIPCRED,
            text0: toptext,
            text1: bottext,
        };

        const resp = await axios.post("https://api.imgflip.com/caption_image", qs.stringify(data));
        body = '<html><img src="' + resp.data.data.url + '"></html>';
        return callBack(null, body);
    },

    pullLatestMemes: async function () {
        let memeData = await axios.get("https://api.imgflip.com/get_memes");
        await fs.writeFile(
            path.join(__dirname, "../..", "cache", "hotmemes.json"),
            JSON.stringify(memeData.data)
        );
    },
};
