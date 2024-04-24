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

const reactionEmojis = [
	"😂", // Tears of Joy
	"❤️", // Red Heart
	"😍", // Heart Eyes
	"🔥", // Fire
	"😊", // Smiling Face with Smiling Eyes
	"🙌", // Raising Hands
	"👏", // Clapping Hands
	"🎉", // Party Popper
	"👍", // Thumbs Up
	"😎", // Smiling Face with Sunglasses
	"🙏", // Folded Hands
	"💯", // Hundred Points
	"✨", // Sparkles
	"😘", // Face Blowing a Kiss
	"🤔", // Thinking Face
	"👀", // Eyes
	"💪", // Flexed Biceps
	"👌", // OK Hand
	"😜", // Winking Face with Tongue
	"😅", // Grinning Face with Sweat
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
			reactions: getRandomArrItem(reactionEmojis),
		});
	}
	return results;
};

const getRandomEmail = () => {
	const usernameLength = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Random username length between 5 and 10 characters
	const domain = [
		"gmail.com",
		"yahoo.com",
		"hotmail.com",
		"outlook.com",
		"icloud.com",
		"aol.com",
	][Math.floor(Math.random() * 6)]; // Random domain from a list

	let username = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < usernameLength; i++) {
		username += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}

	return username + "@" + domain;
};

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomThoughts, getRandomEmail };
