const { ctrlWrapper } = require("../../helpers");

const getAll = require("./getAll");
const add = require("./add");
const remove = require("./remove");
const updateStatus = require("./updateStatus");
const update = require("./update");
const getById = require("./getById");


module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	remove: ctrlWrapper(remove),
	update: ctrlWrapper(update),
	updateStatus: ctrlWrapper(updateStatus),
};
