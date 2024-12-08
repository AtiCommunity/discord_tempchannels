const { MessageFlags, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display all the commands of the applicaiton.'),
    async execute(interaction) {
        await interaction.reply({ content: 'WIP', flags: MessageFlags.Ephemeral });
    },
};