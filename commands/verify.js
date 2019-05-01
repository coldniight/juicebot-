const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let verifiedrole = message.guild.roles.find('name', 'Verified');
    let unverifiedrole = message.guild.roles.find('name', 'Unverified');

    let alreadyembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You're already verified, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    if(!message.member.roles.has(unverifiedrole.id)) return message.channel.send(alreadyembed);
    await(message.member.addRole(verifiedrole.id));
    await(message.member.removeRole(unverifiedrole.id));
    await message.delete();
}

module.exports.help = {
    name: "verify"
}
