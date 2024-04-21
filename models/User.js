const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

// Schema to create Student model
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			max_length: 50,
		},
		email: {
			type: String,
			required: true,
			max_length: 50,
		},
		thoughts: [thoughtSchema],
		friends: [userSchema],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

userSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
