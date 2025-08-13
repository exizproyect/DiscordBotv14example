const { ActivityType } = require('discord.js');
const client = require('..');

client.on("ready", () => {
	const activities = [
		{ name: `Soldier programando...`, type: ActivityType.Watching },
		{ name: `v1.0.2 Beta`, type: ActivityType.Playing },
		{ name: `Nobody - NCS`, type: ActivityType.Listening },
	];
	const status = [
		'online',
		'dnd',
		'idle'
	];
	let i = 0;
	setInterval(() => {
		if(i >= activities.length) i = 0
		client.user.setActivity(activities[i])
		i++;
	}, 5000);

	let s = 0;
	setInterval(() => {
		if(s >= activities.length) s = 0
		client.user.setStatus(status[s])
		s++;
	}, 30000);
	console.log(`Logged in as ${client.user.tag}!`)
});
