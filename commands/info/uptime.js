const { Client, Collection } = require("discord.js");

module.exports = {
    name: 'uptime',
    description: `Displays how long the bot has been online.`,
    category: "info",
    aliases: ["uptime","ut","Uptime","UT"],
    run: async (client, message, args) => {
        const msg = await message.channel.send(`${client.user.username} has been online for ${client.uptime / 60000} minutes.`)
    }
}