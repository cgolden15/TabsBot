const { Client, Collection } = require("discord.js");
const chalk = require('chalk');

module.exports = {
    name: 'uptime',
    description: `Displays how long the bot has been online.`,
    category: "info",
    aliases: ["uptime","ut","Uptime","UT"],
    run: async (client, message, args) => {
        const msg = await message.channel.send(`${client.user.username} has been online for ${Math.round(client.uptime / 60000)} minutes.`)
        
        if(client.uptime >= 60000 && client.uptime < 3600000){
            console.log(chalk.blue(`${new Date().toLocaleString()} - Command run: Uptime [${Math.round(client.uptime / 60000)} minutes]`));
        } if(client.uptime < 60000){
            console.log(chalk.blue(`${new Date().toLocaleString()} - Command run: Uptime [${Math.round(client.uptime / 1000)} seconds]`))
        } if(client.uptime > 3600000){
            console.log(chalk.blue(`${new Date().toLocaleString()} - Command run Uptime [${Math.round(client.uptime / 3600000)} hours]`))
        }
    }
}
