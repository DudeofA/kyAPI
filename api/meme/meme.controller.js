const { createMeme } = require("./meme.service");

class Meme {
    constructor(memeName, toptext, bottext) {
        this.memeName = memeName;
        this.toptext = toptext;
        this.bottext = bottext;
        this.memeID = memeName;
    }
}

module.exports = {
    createRandMeme: (req, res) => {
        createMeme(null, null, null, (err, meme) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Meme generation error :(",
                });
            }
            return res.send(meme);
        });
    },

    createMemeByName: (req, res) => {
        createMeme(req.query.meme, req.query.toptext, req.query.bottext, (err, meme) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    messag: "Meme creation error",
                });
            }

            return res.send(meme);
        });
    },

    pullLatestMemes: (req, res) => {
        pullLatestMemes();
    },
};
