const {
    EmbedBuilder,
    MessageFlags,
    PermissionFlagsBits,
    SlashCommandBuilder,
} = require("discord.js");
const {
    Developer,
    DiscordJSVersion,
    NodeJSVersion,
    Version,
} = require("../../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Display all the commands of the applicaiton."),
    async execute(interaction) {
        const infoDevEmbed = new EmbedBuilder()
            .setColor(0xfdd835)
            .setTitle("TempsChannels")
            .setDescription(
                "Create your own temporary channels.\n *Free For Ever !* :wink:"
            )
            .setThumbnail("https://i.imgur.com/zNWd7AE.png")
            .addFields(
                {
                    name: "Source Code",
                    value: `[Click here](https://github.com/AtiCommunity/discord_tempchannels)`,
                    inline: true,
                },
                {
                    name: "Discord.js",
                    value: `${DiscordJSVersion}`,
                    inline: true,
                },
                { name: "Node.js", value: `${NodeJSVersion}`, inline: true },
                { name: "Version", value: `${Version}`, inline: true },
                {
                    name: "Developed by",
                    value: `[${Developer}](https://github.com/Atineon)`,
                    inline: true,
                }
            );

        const userCommandEmbed = new EmbedBuilder()
            .setTitle("TempChannels | User commands")
            .setColor(0xfdd835)
            .setThumbnail("https://i.imgur.com/fopKy0r.png")
            .addFields(
                {
                    name: "/help",
                    value: "Display all the commands of the applicaiton.",
                    inline: true,
                },
                {
                    name: "/setup",
                    value: "Establish mandatory categories and channels.",
                    inline: true,
                }
            );

        const helpEmbed = new EmbedBuilder()
            .setTitle("TempChannels | Help menu")
            .setColor(0xfdd835)
            .setThumbnail("https://i.imgur.com/UOLqCUh.png")
            .addFields({
                name: "How to use",
                value: 'Easy to use! Just enter /setup command in a server channel to create a category that create temporary channels and then join the channel "➕ New Channel"',
            });

        await interaction.reply({
            embeds: [infoDevEmbed, userCommandEmbed, helpEmbed],
            flags: MessageFlags.Ephemeral,
        });
    },
};
