// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const userCount = async () => {
	try {
		const numberOfUsers = await User.aggregate([
			{
				$group: {
					_id: null,
					number_of_users: { $count: {} },
				},
			},
		]);
		return numberOfUsers;
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = {
	// Get all users
	async getUsers(req, res) {
		try {
			const users = await User.find();
			const userObj = {
				users,
				totalCount: await userCount(),
			};
			return res.json(userObj);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
	// Get a single user
	async getSingleUser(req, res) {
		try {
			const user = await User.findOne({ _id: req.params.userId })
				.select("-__v")
				.lean();

			if (!user) {
				return res.status(404).json({ message: "No user with that ID" });
			}

			res.json({
				user,
				grade: await reaction(req.params.userId),
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
	// create a new user
	async createUser(req, res) {
		try {
			const user = await User.create(req.body);
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// create a new user
	async updateUser(req, res) {
		try {
			const user = await User.update(req.body);
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// Delete a user and remove them from the thought
	async deleteUser(req, res) {
		try {
			const user = await User.findOneAndRemove({
				_id: req.params.userId,
			});

			if (!user) {
				return res.status(404).json({ message: "No such user exists" });
			}

			const thought = await Thought.findOneAndUpdate(
				{ users: req.params.userId },
				{ $pull: { users: req.params.userId } },
				{ new: true }
			);

			if (!thought) {
				return res.status(404).json({
					message: "User deleted, but no thoughts found",
				});
			}

			res.json({ message: "User successfully deleted" });
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},
	// create a new friend
	async createFriend(req, res) {
		try {
			const friend = await Friend.create(req.body);
			res.json(friend);
		} catch (err) {
			res.status(500).json(err);
		}
	},
};
