const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const validSubscriptions = ["starter", "pro", "business"];

const userSchema = new Schema(
	{
		password: {
			type: String,
			minlength: 6,
			required: [true, "Set password for user"],
		},
		email: {
			type: String,
			match: emailRegexp,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: validSubscriptions,
			default: "starter",
		},
		token: {
			type: String,
			default: ""
		}
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
	subscription: Joi.string().valid(...validSubscriptions),
});

const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({ subscription: Joi.string().valid(...validSubscriptions).required() });

const schemas = {
	registerSchema,
	loginSchema,
	updateSubscriptionSchema,
};
const User = model("user", userSchema);

module.exports = { User, schemas };
