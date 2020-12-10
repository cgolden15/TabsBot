const chalk = require('chalk');
const { Client, Collection } = require("discord.js");

let Developers = ["317283391982534666"]

module.exports = {
    name: "Test",
    description: "Testing",
    category: "admin",
    run: async (client, message, args) => {
        Developers.includes(message.author.id);{
            const msg = await message.channel.send('You own the bot')
        }
    
    }
};
