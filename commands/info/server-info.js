module.exports = {
    name: "Server info",
    category: "info",
    description: "Displays information about the server.",
    aliases: ["serverinfo", "server"],
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
        console.log("\x1b[34m%s\x1b[0m" ,"Command run: Server Info");
    }
}