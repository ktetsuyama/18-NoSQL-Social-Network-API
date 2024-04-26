const connection = require("../config/connection");
const { Thought, User } = require("../models");
const {
	getRandomUsername,
	getRandomThoughts,
	getRandomEmail,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
	console.log("connected");
	// Delete the collections if they exist
	let thoughtCheck = await connection.db
		.listCollections({ name: "thoughts" })
		.toArray();
	if (thoughtCheck.length) {
		await connection.dropCollection("thoughts");
	}

	let usersCheck = await connection.db
		.listCollections({ name: "users" })
		.toArray();
	if (usersCheck.length) {
		await connection.dropCollection("users");
	}
	// Create empty array to hold the users and to hold thoughts
	const users = [];
	const thoughts = [];

	// Loop 20 times to create users
	for (let i = 0; i < 20; i++) {
		const username = getRandomUsername();
		const email = getRandomEmail();
		const thoughtText = getRandomThoughts(1)[0].thoughtName;

		// Create thought document
		const thought = new Thought({
			thoughtText: thoughtText,
			username: username,
		});

		// Push thought document into the thoughts array
		thoughts.push(thought);

		// Create user document
		const user = new User({
			username: username,
			email: email,
			thoughts: [thought._id],
		});

		// Push user document into the users array
		users.push(user);
	}

	// Insert users into the database
	User.insertMany(users)
		.then(() => {
			return Thought.insertMany(thoughts);
		})
		.then(() => {
			console.log("Seeding complete! 🌱");
			process.exit(0);
		})
		.catch((error) => {
			console.error("Error seeding data:", error);
			process.exit(1);
		});
});
