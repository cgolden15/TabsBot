const { RichEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    category: "fun",
    description: "Sends an epic meme",
    run: async (client, message, args) => {
        
        const subReddits = ["dankmeme", "meme", "me_irl"];
       
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        
        const img = await randomPuppy(random);
        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);
        console.log("\x1b[35m%s\x1b[0m","Command run: Meme")
    }
}