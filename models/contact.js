
const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const contactSchemaMoongose = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
		  },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);


contactSchemaMoongose.post("save", handleMongooseError);

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});
const updateStatusSchema = Joi.object({ favorite: Joi.boolean().required() });

const Contact = model("contact", contactSchemaMoongose);

const schemas = {
	addSchema,
	updateStatusSchema,
};

module.exports = { Contact, schemas };