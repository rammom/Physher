const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = mongoose.Schema.Types.ObjectId;

let AttackSchema = new Schema({
	title: { type: String, required: true },
	from: { type: String, required: true },
	to: [{ type: String, required: true }],
	date: { type: Date, required: true },
	clicked: [{ type: String }]
});

module.exports = mongoose.model('Attack', AttackSchema);