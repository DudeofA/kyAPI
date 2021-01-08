const { createMeme } = require("./meme.service");

module.exports = {
    createRandMeme: (req, res) => {
        createMeme (null,(err, meme) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Meme generation error :("
                });
            }
            return res.send(meme);
        });
    }
}