const { ActivityType, Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        client.user.setActivity("channels | /help", {
            type: ActivityType.Watching,
        });
        console.log(`Logged in as ${client.user.tag}!`);
    },
};
