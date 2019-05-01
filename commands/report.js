const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let noperm = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You don't have enough permissions to see that command, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let helpembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Usage of command **report**\n\n**Usage:** j!report <member> <reason>\n**Description:** Reports a member to the staff. **You will get warned if you send shitpost**.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    if(args[0] == "help"){
        message.channel.send(helpembed);
        return;
    }

    let successembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Successfully sent the report to the staff, ${message.author}. Thanks for reporting!`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let reasonembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Please supply a reason of the report, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let errorembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Please specify a valid user to report, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send(errorembed);
    let reason = args.join(" ").slice(22);
    if(!reason) return message.channel.send(reasonembed);

    let rembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Report log sent by ${message.author} with id \`${message.author.id}\``)
    .addField("Reported User", `${rUser} with ID \`${rUser.id}\``)
    .addField("Reported in", `${message.channel} with ID \`${message.channel.id}\``)
    .addField("With Reason", `\`${reason}\``)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let reportchannel = message.guild.channels.find(`id`, `572978914511552513`)
    reportchannel.send(rembed);
    message.channel.send(successembed);
}

module.exports.help = {
    name: "report"
}