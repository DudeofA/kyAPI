const axios = require("axios");
const qs = require("qs");
const fs = require("fs/promises");
const path = require("path");
const Fuse = require("fuse.js");

module.exports = {
    createMeme: async function (meme, toptext, bottext, callBack) {
        // Load memes into memory
        let rawMemeData = await fs.readFile(
            path.join(__dirname, "../..", "cache", "hotmemes.json")
        );
        memeData = JSON.parse(rawMemeData);

        if (meme == null) {
            memeID = memeData.data.memes[Math.floor(Math.random() * memeData.data.memes.length)].id;
        } else {
            // Validate and grab memeID
            const options = {
                includeScore: true,
                // Search in `author` and in `tags` array
                keys: ["name"],
            };

            const fuse = new Fuse(memeData.data.memes, options);

            const result = fuse.search(meme);

            console.log(result);

            if (result.length > 0) {
                if (result[0].score <= 0.5) {
                    memeID = result[0].item.id;
                } else {
                    return callBack("No relevant memes found", null);
                }
            } else {
                return callBack("No relevant memes found", null);
            }
        }

        if (toptext == null) {
            toptext = " ";
        }

        if (bottext == null) {
            bottext = " ";
        }

        const data = {
            template_id: memeID,
            username: "kylixor",
            password: process.env.KYIMGFLIPCRED,
            text0: toptext,
            text1: bottext,
        };

        const resp = await axios.post("https://api.imgflip.com/caption_image", qs.stringify(data));
        // body = '<html><img src="' + resp.data.data.url + '"></html>';
        body = resp.data.data.url;
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
