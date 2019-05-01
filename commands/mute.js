const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (bot, message, args) => {

    let errorembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Please specify a valid user to mute, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let timeembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Please supply a time to mute, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let unmutedembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You have been unmuted automatically by the bot in \`${message.guild}\`.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let permembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You don't have enough permissions to run the \`mute\` command, ${message.author}.`)
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
    .setDescription(`Usage of command **mute**\n\n**Usage:** j!mute <member> <time> <reason>\n**Description:** Mutes a user for an amout of time.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.send(noperm)
    if(args[0] == "help"){
        message.channel.send(helpembed);
        return;
    }

    let staffRole = message.guild.roles.find('name', 'Staff');

    if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.send(permembed);

    let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!tomute) return message.channel.send(errorembed);

    let allowembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You are not allowed to perform \`mute\` on user ${tomute}, ${message.author}`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    if(tomute.roles.has(staffRole.id)) return message.channel.send(allowembed);
    let muterole = message.guild.roles.find('name', 'muted');
    if (!muterole) {
        try{
            muterole = await message.guild.createRole({
                name:"muted",
                color:"#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    } 

    let mutetime = args[1];
    if(!mutetime) return message.channel.send(timeembed);

    let reason = args.join(" ").slice(25);
    if(!reason) reason = 'No reason given'

    let successembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Successfully muted user ${tomute} for  \`${ms(mutetime)}\` with reason \`${reason}\`, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let muteembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You have been muted by ${message.author} for ${ms(mutetime)} with reason ${reason}.\n\n**Attemping to bypass a mute will get you muted for more time if you're caught.**`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    await(tomute.addRole(muterole.id));
    message.channel.send(successembed)
    tomute.send(muteembed)

    
    let membed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Muted user ${tomute} with id \`${tomute.id}\``)
    .addField("Muted in", `${message.channel} with ID \`${message.channel.id}\``)
    .addField("Moderator", `${message.author} with ID \`${message.author.id}\``)
    .addField("For", `${mutetime}`)
    .addField("With Reason", `\`${reason}\``)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let reportchannel = message.guild.channels.find(`id`, `572979066919976980`)
    reportchannel.send(membed);
    
    setTimeout(function(){
        if(!tomute.roles.has(muterole.id)) return;
        tomute.removeRole(muterole.id);
        tomute.send(unmutedembed);
    }, ms(mutetime));
}

module.exports.help = {
    name: "mute"
}