const chalk = require('chalk');

module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    category: "info",
    aliases: ["ping", "pong", "latency"],
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(`🏓 Pong!
        Discord latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
        API latency is ${Math.round(client.ping)}ms`);

        if(client.ping <= 250){
        console.log(chalk.blue(`${new Date().toLocaleString()} - Command run: Ping [${Math.round(client.ping)}ms]`));
         
        } else {
            console.log(chalk.bgRedBright.black(`${new Date().toLocaleString()} - WARNING: Client Ping over 250ms! [${client.ping}ms]`))
        }

    }
