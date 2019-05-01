const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    await message.delete().catch(O_o=>{});

    const a = message.guild.roles.get('573197802503405568');

    const filter = (reaction, user) => ['🔞'].includes(reaction.emoji.name) && user.id === message.author.id;
    
    const roleembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Avaible Roles for user ${message.author}\n\n**🔞** ${a.toString()}`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    const addedembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You have been added the **${a.name}** role, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    const failedembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`I don't have permissions to add the **${a.name}** role, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    const alreadyembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You already have the **${a.name}** role, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    message.channel.send(roleembed).then(async msg => {
        await msg.react('🔞');

        msg.awaitReactions(filter, {
            max: 1, 
            time: 30000,
            errors: ['time']
        }).then(collected => {
            const reaction = collected.first();
            switch(reaction.emoji.name) {
                case'🔞':
                if (message.member.roles.has(a.id)) {
                    msg.delete();
                    return message.channel.send(alreadyembed);
                }
                message.member.addRole(a).catch(err => {
                    let errembed = new Discord.RichEmbed()
                    .setTitle("Juice Bot")
                    .setDescription(`Failed to add the **${a.name}** role: ${err.message}.`)
                    .setColor(0x00fffa)
                    .setFooter(message.id)
                    .setTimestamp();
                
                    console.log(err);
                    message.channel.send(errembed);
                });
                message.channel.send(addedembed);
                msg.delete();
                break;
            }
        }).catch(collected => {
            return message.channel.send(failedembed);
        });
    });
}

module.exports.help = {
    name: "roles"
}