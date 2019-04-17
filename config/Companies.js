var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var CompanySchema = new Schema({

	name: {
		type: String
	},
	address: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	zipcode: {
		type: String
	},
	entry_date: {
		type: String
	},

	// `CountId` is an object that stores a Counts id
	// The ref property links the ObjectId to the Counts model
	// This allows us to populate the Companies with an associated Count
	countId: [
		{
			type: Schema.Types.ObjectId,
			ref: "Counts"
		}
	]
});

// This creates our model from the above schema, using mongoose's model method
module.exports = mongoose.model('Companies', CompanySchema);
