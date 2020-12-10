const chalk = require('chalk');
const { Client, Collection } = require("discord.js");

let Developers = ["317283391982534666"]

module.exports = {
    name: "Kill",
    description: "Stops the bot. Use in caase of emergency.",
    category: "admin",
    aliases: ["kill", "godie"],
    run: async (client, message, args) => {
        if(Developers.includes(message.author.id));{
            const msg = await message.channel.send('You own the bot')
        }
    }
}
