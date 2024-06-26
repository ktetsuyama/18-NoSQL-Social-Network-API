const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

// Schema to create Student model
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: function (tetsu) {
					return /^\S+@\S+\.\S+$/.test(tetsu);
				},
				message: (props) => `${props.value} is not a valid email!`,
			},
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "thought",
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "user",
			},
		],
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

userSchema.virtual("userThoughts", {
	ref: Thought,
	localField: "_id",
	foreignField: "userId",
});

const User = model("user", userSchema);

module.exports = User;
