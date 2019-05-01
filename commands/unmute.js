const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (bot, message, args) => {
    let noperm = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You don't have enough permissions to see that command, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let helpembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Usage of command **unmute**\n\n**Usage:** j!unmute <member>\n**Description:** Unmutes a member manually.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.send(noperm)
    if(args[0] == "help"){
        message.channel.send(helpembed);
        return;
    }
    
    let muterole = message.guild.roles.find('name', 'muted');


    let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);

    let errorembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`The user ${tomute} isn't muted, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let validembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Please specify a valid user to unmute, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let staffRole = message.guild.roles.find('name', 'Staff');

    let permembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You don't have enough permissions to run the \`unmute\` command, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.send(permembed);


    if (!tomute) return message.channel.send(validembed);
    if (!tomute.roles.has(muterole.id)) return message.channel.send(errorembed);

    let successembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Successfully unmuted user ${tomute}, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let muteembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You have been unmuted manually by ${message.author} in \`${message.guild}\`.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    await(tomute.removeRole(muterole.id));
    message.channel.send(successembed)
    tomute.send(muteembed)
}

module.exports.help = {
    name: "unmute"
}