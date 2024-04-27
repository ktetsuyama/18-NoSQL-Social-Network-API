const { Thought, User, Reaction } = require("../models");

module.exports = {
	// Get all thoughts
	async getThoughts(req, res) {
		try {
			const thoughts = await Thought.find();
			const thoughtObj = {
				thoughts,
			};
			return res.json(thoughtObj);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
	// Get a thought by id
	async getSingleThought(req, res) {
		try {
			const thought = await Thought.findOne({
				_id: req.params.thoughtId,
			});

			if (!thought) {
				return res.status(404).json({ message: "No thought with that ID" });
			}

			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// Create a thought
	async createThought(req, res) {
		try {
			const thought = await Thought.create(req.body);
			const updatedUser = await User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $addToSet: { thoughts: thought } },
				{ runValidators: true, new: true }
			);
			if (!updatedUser) {
				return res.status(404).json({ error: "User not found" });
			}
			res.json(thought);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
	// Delete a thought
	async deleteThought(req, res) {
		try {
			const thought = await Thought.findOneAndDelete({
				_id: req.params.thoughtId,
			});

			if (!thought) {
				return res.status(404).json({ message: "No thought with that ID" });
			}

			await User.updateMany(
				{ thoughts: req.params.thoughtId },
				{ $pull: { thoughts: req.params.thoughtId } }
			);

			res.json({ message: "Thought deleted!" });
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// Update a thought
	async updateThought(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			);

			if (!thought) {
				return res.status(404).json({ message: "No thought with this id!" });
			}

			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// add a new reaction
	async addReaction(req, res) {
		console.log("You are adding a reaction");

		const { thoughtId } = req.params;
		console.log(thoughtId);
		try {
			const reaction = await Reaction.create(req.body);
			const thought = await Thought.findOneAndUpdate(
				{ _id: thoughtId },
				{ $addToSet: { reactions: reaction } },
				{ runValidators: true, new: true }
			);
			console.log(thought);

			if (!reaction) {
				return res
					.status(404)
					.json({ message: "No reaction found with that ID" });
			}

			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// remove a reation
	async removeReaction(req, res) {
		console.log("You are deleting a reaction");

		const { reactionId } = req.params;
		console.log(reactionId);
		try {
			if (!req.body._id) {
				return res.status(400).json({ error: "Reaction id is required" });
			}
			const reaction = new ObjectId(req.params.reactionId);
			const thought = await Thought.findOneAndUpdate(
				{ _id: thoughtId },
				{ $pull: { reactions: reaction } },
				{ runValidators: true, new: true }
			);
			console.log(thought);

			if (!reaction) {
				return res
					.status(404)
					.json({ message: "No reaction found with that ID" });
			}

			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},
};
