const usernames = [
	"Emma",
	"Liam",
	"Olivia",
	"Noah",
	"Ava",
	"William",
	"Sophia",
	"James",
	"Isabella",
	"Oliver",
	"Charlotte",
	"Benjamin",
	"Amelia",
	"Elijah",
	"Mia",
	"Lucas",
	"Harper",
	"Mason",
	"Evelyn",
	"Logan",
	"Avery",
	"Alexander",
	"Sofia",
	"Ethan",
	"Emily",
	"Smith",
	"Johnson",
	"Williams",
	"Jones",
	"Brown",
	"Davis",
	"Miller",
	"Wilson",
	"Moore",
	"Taylor",
	"Anderson",
	"Thomas",
	"Jackson",
	"White",
	"Harris",
	"Martin",
	"Thompson",
	"Garcia",
	"Martinez",
	"Robinson",
	"Clark",
	"Rodriguez",
	"Lewis",
	"Lee",
	"Walker",
	"Zoolander",
];

const emails = [
	"jQq8c@gmail.com",
	"e1e3g@yahoo.com",
	"LzX23Rv@hotmail.com",
	"k2i9p@outlook.com",
	"S5F4mO@icloud.com",
	"3xW7Q4@aol.com",
	"vRcN8@yahoo.com",
	"2ZtQ4Rn@outlook.com",
	"pA1Ez@gmail.com",
	"s6Jb1o@hotmail.com",
	"Q0xYb@aol.com",
	"TgY1p@yahoo.com",
	"4FjXsC@gmail.com",
	"nDdO3g1@icloud.com",
	"1iU4o5W@outlook.com",
	"jFg7Sx@hotmail.com",
	"mO5c6g4@icloud.com",
	"6tJc6G@hotmail.com",
	"R9k4ZrQ@yahoo.com",
	"aS1E8b@aol.com",
	"1R5lH@hotmail.com",
	"h5L6Tn@icloud.com",
	"e9W8L@aol.com",
	"2V4f1o@hotmail.com",
	"B7g1Nt@yahoo.com",
	"R8k7eL@gmail.com",
	"n9Y7z@hotmail.com",
	"Q1pK7y@outlook.com",
	"3jY8zQ@gmail.com",
	"i6r2tS@yahoo.com",
];

const thoughtTitles = [
	"We're all just older than we've ever been before.",
	"Dreams are the brain's late-night movies.",
	"The present is the oldest you've ever been.",
	"Tomorrow's yesterday is today.",
	"Silence is the loudest sound you can hear.",
	"Every mirror you see is actually from the past.",
	"Sleep is like time travel to tomorrow.",
	"Breathing is just a repetitive near-death experience.",
	"Memories are the past living in the present.",
	"Technically, you're always experiencing the future.",
	"Every goodbye is a tiny rehearsal for death.",
	"We're all just improvising this thing called life.",
	"Laughter is the sound of unexpected connections.",
	"In the end, time is our only true currency.",
	"Raindrops are nature's version of pixels.",
	"The Earth has traveled more than you ever will.",
	"A hug is a silent 'I'm here for you.'",
	"We're all made of stardust, but forget to shine.",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full username
const getRandomUsername = () =>
	`${getRandomArrItem(usernames)} ${getRandomArrItem(usernames)}`;

// Function to generate random thoughts that we can add to username object.
const getRandomThoughts = (int) => {
	const results = [];
	for (let i = 0; i < int; i++) {
		results.push({
			thoughtName: getRandomArrItem(thoughtTitles),
			reactions: Math.floor(Math.random() * (990 - 70 + 1) + 70),
		});
	}
	return results;
};

const getRandomEmails = (int) => {
	const results = [];
	for (let i = 0; i < int; i++) {
		results.push({
			thoughtName: getRandomArrItem(emails),
		});
	}
	return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomThoughts, getRandomEmails };
