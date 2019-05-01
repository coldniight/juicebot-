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
    .setDescription(`Usage of command **clear**\n\n**Usage:** j!clear <amount>\n**Description:** Deletes an amount of messages.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.send(noperm)
    if(args[0] == "help"){
        message.channel.send(helpembed);
        return;
    }
    
    let messageembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Please supply a number of messages to delete, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let staffRole = message.guild.roles.find('name', 'Staff');
    if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.send(permembed);
    if(!args[0]) return message.channel.send(messageembed);
    message.delete();
    message.channel.bulkDelete(args[0]);
}

module.exports.help = {
    name: "clear"
}