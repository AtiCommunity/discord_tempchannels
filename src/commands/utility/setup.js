const {
    ChannelType,
    InteractionContextType,
    MessageFlags,
    PermissionFlagsBits,
    SlashCommandBuilder,
} = require("discord.js");
const { Category, Channel } = require("../../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Establish mandatory categories and channels.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setContexts(InteractionContextType.Guild),
    async execute(interaction) {
        const categoryFinder = interaction.guild.channels.cache.find(
            (channel) => channel.name === Category && channel.type === 4
        );
        const channelFinder = interaction.guild.channels.cache.find(
            (channel) => channel.name === Channel && channel.type === 2
        );

        if (categoryFinder && channelFinder) {
            return await interaction.reply({
                content:
                    "Mandatory categories and channels already established.",
                flags: MessageFlags.Ephemeral,
            });
        }

        if (!categoryFinder) {
            await interaction.guild.channels.create({
                name: Category,
                type: ChannelType.GuildCategory,
            });
        }
        if (!channelFinder) {
            await interaction.guild.channels.create({
                name: Channel,
                type: ChannelType.GuildVoice,
                parent: categoryFinder,
                position: 2,
            });
        }

        await interaction.reply({
            content: "Mandatory categories and channels established.",
            flags: MessageFlags.Ephemeral,
        });
    },
};
