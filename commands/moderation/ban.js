const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "ban",
    category: "moderation",
    description: "bans the member",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

        if (message.deletable) message.delete();

        
        if (!args[0]) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Ban [No reason]")
            return message.reply("Please provide a person to ban.")
                .then(m => m.delete(5000));
        }

        
        if (!args[1]) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Ban [No reason]")
            return message.reply("Please provide a reason to ban.")
                .then(m => m.delete(5000));
        }

        
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Ban [No Perms]")
            return message.reply("❌ You do not have permissions to ban members. Please contact an admin if you believe this to be a mistake.")
                .then(m => m.delete(5000));
        
        }
        
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Ban [Missing bot perms...]")
            return message.reply("❌ I do not have permissions to ban members. Please ask an admin to give me perms!")
                .then(m => m.delete(5000));
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        
        if (!toBan) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Ban [Member not found]")
            return message.reply("Couldn't find that member, try again")
                .then(m => m.delete(5000));
        }

        
        if (toBan.id === message.author.id) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Ban [Self ban....]")
            return message.reply("You can't ban yourself...")
                .then(m => m.delete(5000));
        }

        
        if (!toBan.bannable) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Ban [Member above executor]")
            return message.reply("I can't ban that person due to role hierarchy, I suppose.")
                .then(m => m.delete(5000));
        }
        
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**> baned member:** ${toBan} (${toBan.id})
            **> baned by:** ${message.member} (${message.member.id})
            **> Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new RichEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Do you want to ban ${toBan}?`)

        
        await message.channel.send(promptEmbed).then(async msg => {
            
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            
            if (emoji === "✅") {
                msg.delete();

                toBan.ban(args.slice(1).join(" "))
                console.log("\x1b[31m%s\x1b[0m","Command Executed: Ban [Sucessful]")

                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`ban canceled.`)
                console.log("\x1b[33m%s\x1b[0m","Command Canceled: Ban [Canceled]")
                    .then(m => m.delete(10000));
            }
        });
    }
};