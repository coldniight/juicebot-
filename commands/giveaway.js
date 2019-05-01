const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    var errorembed2 = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Please supply a valid number of time, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    var errorembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Please supply a valid number of winners, ${message.author}.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    let permembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`You don't have enough permissions to run the \`giveaway\` command, ${message.author}.`)
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
    .setDescription(`Usage of command **giveaway**\n\n**Usage:** j!giveaway <winners> <time> <item>\n**Description:** Creates a giveaway of a item for a specific amount of time.`)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    if(!message.member.hasPermissions("BAN_MEMBERS")) return message.channel.send(noperm)
    if(args[0] == "help"){
        message.channel.send(helpembed);
        return;
    }


    if(!message.member.hasPermissions("BAN_MEMBERS")) return message.channel.send(permembed);

    var item = args.join(" ").slice(3);
    var time;
    var winnerCount;

    winnerCount = args[0];
    if(isNaN(winnerCount)) return message.channel.send(errorembed);
    time = args[1];
    if(isNaN(time)) return message.channel.send(errorembed2);

    var giveawayembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`**New Giveaway: ${item}**\n\n Press **✅** to join\n**Time Left:** \`${time}\` minute(s)\n**Winners:** \`${winnerCount}\``)
    .setColor(0x00fffa)
    .setFooter(message.id)
    .setTimestamp();

    var embedsent = await message.channel.send(giveawayembed);
    embedsent.react("✅");
    setTimeout(function() {
        var peopleReacted = embedsent.reactions.get("✅").users.array();
        var index = Math.floor(Math.random() * peopleReacted.length);
        var winners = [];
        var winnermessage = "";
        for (var i = 0; i < winnerCount; i++){
            winners.push(peopleReacted[index]);
            index = Math.floor(Math.random() * peopleReacted.length);
        }
        for (var i = 0; i < winners.length; i++){
            if (winners[i].id == bot.user.id){
                winners.join(" ").slice(i); //winners[i].slice(i, 1); 
                continue;
            }
            winnermessage += (winners[i].toString() + " ");
        }
        var haveHas = "has";
        if (winners.length == 1){
            haveHas = "has";
        }
        else{
            haveHas = "have";
        }
        message.channel.send(winnermessage + " " + haveHas + ` won the **${item}** giveaway.`);
    }, time * 60000)
}

module.exports.help = {
    name: "giveaway"
}