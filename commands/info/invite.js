module.exports = {
    name: "invite",
    description: "Gives the link to invite Essentials Bot to your server",
    category: "info",
    aliases: ["invite","inv"],
    run: async (client, message, args) => {
        const msg = await message.channel.send("Want to invite Tabs to your server? Click the link and follow the prompts!\n https://discord.com/api/oauth2/authorize?client_id=784451600123035678&permissions=8&scope=bot")
        console.log("\x1b[34m%s\x1b[0m" ,"Command run: Invite");
    }    
}