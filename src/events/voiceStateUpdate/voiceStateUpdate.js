const { ChannelType, Events } = require("discord.js");
const { Category, Channel } = require("../../../config.json");

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        const newStateChannelName = newState.channel && newState.channel.name;
        const oldStateChannelName = oldState.channel && oldState.channel.name;
        const joiningUser = newState.member;
        const leavingUser = oldState.member;

        if (newStateChannelName == Channel) {
            newState.guild.channels.create({
                name: joiningUser.user.displayName,
                type: ChannelType.GuildVoice,
                parent: newState.guild.channels.cache.find(
                    (channel) =>
                        channel.name === Category &&
                        channel.type == ChannelType.GuildCategory
                ),
            });
            setTimeout(() => {
                const newCreatedChannel = newState.guild.channels.cache.find(
                    (channel) =>
                        channel.name === joiningUser.user.displayName &&
                        channel.type == ChannelType.GuildVoice
                );
                if (newState.channel)
                    joiningUser.voice.setChannel(newCreatedChannel);
                else newCreatedChannel.delete();
            }, 1000);
        }
        if (oldStateChannelName == leavingUser.user.displayName) {
            const oldChannelMemberSize = oldState.channel.members.size;
            const channelFinder = oldState.guild.channels.cache.find(
                (channel) => channel.name === leavingUser.user.displayName
            );
            if (oldChannelMemberSize > 0) {
                const userFinder =
                    oldState.channel.members.first().user.displayName;
                channelFinder.setName(`${userFinder}`);
            } else {
                channelFinder.delete();
            }
        }
    },
};
