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
    .setDescription(`Usage of command **unban**\n\n**Usage:** j!unban <userid>\n**Description:** Unbans a member from the server.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    if(!message.member.hasPermissions("BAN_MEMBERS")) return message.channel.send(noperm)
    if(args[0] == "help"){
        message.channel.send(helpembed);
        return;
    }

    let errorembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Please provide a valid user id to unban, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let permembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You don't have enough permissions to run the \`unban\` command, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let staffRole = message.guild.roles.find('name', 'Staff');
    let adminRole = message.guild.roles.find('name', 'Administrator');

    if(!message.member.hasPermissions("BAN_MEMBERS")) return message.channel.send(permembed);

    let tokick = await bot.fetchUser(args[0]);
    if (!tokick) return message.channel.send(errorembed);

    let allowembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You are not allowed to perform \`ban\` on user ${tokick}, ${message.author}`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let reason = args[1];
    if(!reason) reason = 'No comment given'

    let successembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Successfully unbanned user ${tokick}, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let muteembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You have been unbanned by ${message.author} at \`${message.guild.name}\`.\n\n**Moderator note:** ${reason}`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    message.guild.unban(tokick, {reason: reason});
    message.channel.send(successembed);
    tokick.send(muteembed);
    
    let membed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Unbanned user ${tokick} with id \`${tokick.id}\``)
    .addField("Unbanned in", `${message.channel} with ID \`${message.channel.id}\``)
    .addField("Moderator", `${message.author} with ID \`${message.author.id}\``)
    .addField("For Reason", `\`${reason}\``)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let reportchannel = message.guild.channels.find(`id`, `572979066919976980`)
    reportchannel.send(membed);
}

module.exports.help = {
    name: "unban"
}