require("dotenv").config();

const {User} = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const {BASE_URL} = process.env;

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Missing required field email");
    }
    if(user.verify) {
        throw HttpError(401, "Verification has already been passed");
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: "Verify email send success"
    })
}

module.exports = resendVerifyEmail;