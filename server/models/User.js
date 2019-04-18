const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let UserSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	attacks: [{ type: ObjectId, ref: 'Attack' }]
});

module.exports = mongoose.model('User', UserSchema);