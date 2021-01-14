const axios = require('axios');
const qs = require('qs');

module.exports = {
    createMeme: async function (memeID, caption, callBack) {
        let memeData = await axios.get('https://api.imgflip.com/get_memes');
        let randMeme = memeData.data.data.memes[Math.floor(Math.random() * memeData.data.data.memes.length)];

        const data = {
            template_id: randMeme.id,
            username: "kylixor",
            password: process.env.KYIMGFLIPCRED,
            text0: "chuck norris",
            text1: "batman"
        };

        const resp = await axios.post('https://api.imgflip.com/caption_image', qs.stringify(data));
        body = "<html><img src=\"" + resp.data.data.url + "\"></html>";
        return callBack(null, body);
    }
}