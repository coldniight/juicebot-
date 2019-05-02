const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err,files) => {

    if (err) console.log(err); 

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("No commands found.")
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded.`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on('message', async message => { // Message Functions
    if (message.author.bot) return; 
    if (message.channel.type === "dm") return; 

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

    if(message.channel.id === "573275994337706014") {
        if(!(message.content == "j!verify")) {
            message.delete();
        }
    }
});

bot.on('ready', async () => { // Bot on login
    console.log('############################################################################################')
    console.log('##                                                                                        ##')
    console.log('##   Developed by..                                                                       ##')              
    console.log('##                                                                                        ##')
    console.log('##   ████████╗███████╗ █████╗ ███╗   ███╗    ████████╗███████╗██╗   ██╗██╗  ██╗██╗        ##')
    console.log('##   ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║    ╚══██╔══╝██╔════╝██║   ██║██║ ██╔╝██║        ##')
    console.log('##      ██║   █████╗  ███████║██╔████╔██║       ██║   ███████╗██║   ██║█████╔╝ ██║        ##')
    console.log('##      ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║       ██║   ╚════██║██║   ██║██╔═██╗ ██║        ##')
    console.log('##      ██║   ███████╗██║  ██║██║ ╚═╝ ██║       ██║   ███████║╚██████╔╝██║  ██╗██║        ##')
    console.log('##      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝       ╚═╝   ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝        ##')
    console.log('##                                                                   Caelum v1.0.0a       ##')
    console.log('##                                                                                        ##')
    console.log('############################################################################################')
    console.log('                                                                                            ')     
    bot.user.setStatus('dnd')
    bot.user.setActivity('the Juice server', {type: 'WATCHING'});
   });

bot.on('guildMemberAdd', member => { // On member join
    var role = member.guild.roles.find('name', 'Unverified');
    member.addRole(role);

    let instrembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`Welcome to **Juice**, ${member}. To verify say \`j!verify\` in the <#573275994337706014> channel.`)
    .setColor(0x00fffa)
    .setFooter(member.id)
    .setTimestamp();
    
    let welembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`${member} just joined the server. Welcome to Juice:yellow_heart: :tada::hugging: !`)
    .setColor(0x00fffa)
    .setFooter(member.id)
    .setTimestamp();


    let instructionschannel = member.guild.channels.find(`id`, `573275979934334996`)
    instructionschannel.send(instrembed);
    
    member.guild.channels.get("568241349946769409").send(welembed);
});

bot.on('guildMemberRemove', member => {
     let byeembed = new Discord.RichEmbed()
    .setTitle("Juice Bot")
    .setDescription(`${member} just left the server :cbpensive:`)
    .setColor(0x00fffa)
    .setFooter(member.id)
    .setTimestamp();
    
    member.guild.channels.get("568241349946769409").send(byeembed);
})

bot.login(process.env.token);
