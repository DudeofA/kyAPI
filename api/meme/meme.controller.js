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
        createMeme(null, "_rand", "_rand", (err, meme) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Meme generation error :(",
                });
            }
            return res.status(200).json({
                success: true,
                message: meme,
            });
        });
    },

    createMemeByName: (req, res) => {
        createMeme(req.query.meme, req.query.toptext, req.query.bottext, (err, meme) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: err,
                });
            }

            return res.status(200).json({
                success: true,
                message: meme,
            });
        });
    },

    pullLatestMemes: (_req, _res) => {
        pullLatestMemes();
    },
};
