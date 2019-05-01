const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let botembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Pong! \`${Math.round(bot.ping)}\` ms.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();
    message.channel.send(botembed);
}

module.exports.help = {
    name: "ping"
}