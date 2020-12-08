const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicks the member",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;
        console.log("\x1b[33m%s\x1b[0m","Command run: Kick")

        if (message.deletable) message.delete();

        
        if (!args[0]) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Kick[No reason]")
            return message.reply("Please provide a person to kick.")
                .then(m => m.delete(5000));
        }

        
        if (!args[1]) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Kick[No reason]")
            return message.reply("Please provide a reason to kick.")
                .then(m => m.delete(5000));
        }

        
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Kick[No perms]")
            return message.reply("❌ You do not have permissions to kick members. Please contact a staff member")
                .then(m => m.delete(5000));
        }

        
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Kick[Missing bot perms]")
            return message.reply("❌ I do not have permissions to kick members. Please contact a staff member")
                .then(m => m.delete(5000));
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        
        if (!toKick) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Kick [Member not found]")
            return message.reply("Couldn't find that member, try again")
                .then(m => m.delete(5000));
        }

        
        if (toKick.id === message.author.id) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Kick[Self kick...]")
            return message.reply("You can't kick yourself...")
                .then(m => m.delete(5000));
        }

        
        if (!toKick.kickable) {
            console.log("\x1b[33m%s\x1b[0m","Command Canceled: Kick[Member above executor]")
            return message.reply("I can't kick that person due to role hierarchy, I suppose.")
                .then(m => m.delete(5000));
        }
                
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**> Kicked member:** ${toKick} (${toKick.id})
            **> Kicked by:** ${message.member} (${message.member.id})
            **> Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new RichEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Do you want to kick ${toKick}?`)

        
        await message.channel.send(promptEmbed).then(async msg => {
            
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            
            if (emoji === "✅") {
                msg.delete();

                toKick.kick(args.slice(1).join(" "))
                console.log("\x1b[35m%s\x1b[0m","Command Executed: Kick[Successful]")

                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`Kick Canceled.`)
                console.log("\x1b[33m%s\x1b[0m","Command Canceled: Kick[Cancelled]")
                    .then(m => m.delete(10000));
            }
        });
    }
};