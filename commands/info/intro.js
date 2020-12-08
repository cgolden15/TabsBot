module.exports = {
    name: "intro",
    category: "info",
    description: "Introduces the bot",
    aliases: ["intro"],
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Hi! I'm Tabs bot, your virtual replacement for Tabs. If you have anything I should learn, send it to my creator, @golden15#8314. Please run _help to see what I can do!`); 
        console.log("\x1b[34m%s\x1b[0m" ,"Command run: Intro");
    }
}