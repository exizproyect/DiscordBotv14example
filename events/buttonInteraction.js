const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const client = require('..');

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;

    const button = client.buttons.get(interaction.customId);
    if (!button) return;

    try {
        if(interaction.guild){
        if(button.permissions) {
            if(!interaction.memberPermissions.has(PermissionsBitField.resolve(button.permissions || []))) {
                const perms = new EmbedBuilder()
                .setDescription(`No tienes permisos para usar este comando. | [\`${button.permissions}\`]`)
                .setColor('DarkButNotBlack')
                return interaction.reply({ embeds: [perms], ephemeral: true })
            }
        }
    }
        await button.run(client, interaction);
    } catch (error) {
        console.log(error);
    }
});
