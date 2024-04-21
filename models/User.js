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
				validator: function (v) {
					return /^\S+@\S+\.\S+$/.test(v);
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

userSchema.pre("remove", async function (next) {
	await this.model("Thought").deleteMany({ userId: this._id });
	next();
});

const User = model("user", userSchema);

module.exports = User;
