const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');
const ms = require('ms');
const client = require('..');
const config = require('../config.json');

const cooldown = new Collection();

client.on('interactionCreate', async interaction => {
	const slashCommand = client.slashCommands.get(interaction.commandName);
	if (interaction.type == 4) {
		if (slashCommand.autocomplete) {
			const choices = [];
			await slashCommand.autocomplete(interaction, choices)
		}
	}
	if (!interaction.type == 2) return;

	if (!slashCommand) return client.slashCommands.delete(interaction.commandName);
	try {
		if (slashCommand.userPerms || slashCommand.botPerms) {
			if (!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
				const userPerms = new EmbedBuilder()
					.setDescription(`No tienes permisos para usar este comando. | [\`${slashCommand.userPerms}\`]`)
					.setColor('DarkButNotBlack')
				return interaction.reply({ embeds: [userPerms], ephemeral: true })
			}
			if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
				const botPerms = new EmbedBuilder()
					.setDescription(`No tengo permisos para ejecutar este comando. | [\`${slashCommand.botPerms}\`]`)
					.setColor("DarkButNotBlack")
				return interaction.reply({ embeds: [botPerms], ephemeral: true })
			}
		}
		await slashCommand.run(client, interaction);
	} catch (error) {
		console.log(error);
	}
});