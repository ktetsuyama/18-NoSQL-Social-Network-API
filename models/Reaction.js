const { Schema } = require("mongoose");

const reactionSchema = new Schema(
	{
		reactionId: {
			type: String,
			required: true,
		},
		reactionBody: {
			type: String,
			required: true,
			max_length: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: function (value) {
				return value.toDateString();
			},
		},
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

module.exports = reactionSchema;
