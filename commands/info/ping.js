module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    category: "info",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(`🏓 Pong!
        Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
        API Latency is ${Math.round(client.ping)}ms`);
        console.log("\x1b[34m%s\x1b[0m" ,"Command run: Ping")
    }
}