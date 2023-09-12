const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const remove = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndRemove(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json({
		message: "Delete success",
	});
};

module.exports = remove;
