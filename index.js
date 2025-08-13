const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({
	intents: 3276799, 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

const fs = require('fs');
const config = require('./config.json');
require('dotenv').config() // remove this line if you are using replit

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.prefix = config.prefix;

module.exports = client;


fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});


client.login(process.env.TOKEN)
