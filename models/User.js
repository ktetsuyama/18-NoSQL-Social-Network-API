const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

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

userSchema.virtual("thoughts", {
	ref: "Thought",
	localField: "_id",
	foreignField: "userId",
});

userSchema.pre("remove", async function (next) {
	await this.model("Thought").deleteMany({ userId: this._id });
	next();
});

const User = model("user", userSchema);

module.exports = User;
