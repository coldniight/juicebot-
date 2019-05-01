const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (bot, message, args) => {

    let errorembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Please specify a valid user to kick, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let permembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You don't have enough permissions to run the \`kick\` command, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let noperm = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You don't have enough permissions to see that command, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let helpembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Usage of command **kick**\n\n**Usage:** j!kick <member> <reason>\n**Description:** Kicks a user from the server.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    if(!message.member.hasPermissions("KICK_MEMBERS")) return message.channel.send(noperm)
    if(args[0] == "help"){
        message.channel.send(helpembed);
        return;
    }

    let staffRole = message.guild.roles.find('name', 'Staff');

    if(!message.member.hasPermissions("KICK_MEMBERS")) return message.channel.send(permembed);

    let tokick = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!tokick) return message.channel.send(errorembed);

    let allowembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You are not allowed to perform \`kick\` on user ${tokick}, ${message.author}`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    if(tokick.roles.has(staffRole.id)) return message.channel.send(allowembed);

    let reason = args.join(" ").slice(22);
    if(!reason) reason = 'No reason given'

    let successembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Successfully kicked user ${tokick} for reason \`${reason}\`, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let muteembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You have been kicked by ${message.author} for reason \`${reason}\` at \`${message.guild.name}\`.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    message.guild.member(tokick).kick(reason);
    message.channel.send(successembed);
    tokick.send(muteembed);
    
    let membed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Kicked user ${tokick} with id \`${tokick.id}\``)
    .addField("Kicked in", `${message.channel} with ID \`${message.channel.id}\``)
    .addField("Moderator", `${message.author} with ID \`${message.author.id}\``)
    .addField("For Reason", `\`${reason}\``)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let reportchannel = message.guild.channels.find(`id`, `572979066919976980`)
    reportchannel.send(membed);
}

module.exports.help = {
    name: "kick"
}