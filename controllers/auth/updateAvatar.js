const path = require('path');
const fs = require("fs/promises");
const Jimp = require('jimp');

const {User} = require('../../models/user')

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path: tmpUpload, originalname} = req.file;

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    const image = await Jimp.read(tmpUpload);
    image.resize(250, 250);
    await image.writeAsync(resultUpload);

    await fs.unlink(tmpUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
    })
};

module.exports = updateAvatar;