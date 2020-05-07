var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	Land_id: String,
	price: String,
	sqrt: String,
	rooms: String,
	description: String
}),
User = mongoose.model('Record', userSchema);

