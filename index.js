require("dotenv").config();
const Discord = require('discord.js');
const welcome = require('./Events/welcome');
const bot = new Discord.Client();
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const levels = require('discord-xp');
const canvas = require("discord-canvas");
const canvacord = require("canvacord");
const random = require('random');
const prefix = '$';
const fs = require('fs');
const GuildConfig = require("./levelModules/GuildConfig");
const Profile = require("./levelModules/Profile");

bot.on('ready', () => {
    console.log('ready');
    bot.user.setActivity(`${prefix}<Command>`, {type: 'LISTENING'}).catch(console.error);
    welcome(bot);
});


bot.commands = new Discord.Collection();
const commandFile = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFile) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}
mongoose.connect(process.env.MONGO, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

bot.on('message',async message => {
    if(message.author.bot) return;

    

    GuildConfig.findOne({
        guild: message.guild.id
    }, 
    async (err, data) => {
        if(err) console.log(err);
        if(!data) {
           GuildConfig.insertMany({
              guild: message.guild.id,
              prefix: "?"
           }); 
        } 
        
    });
    
    Profile.findOne(
        {
            guildId: message.guild.id,
            userId: message.author.id,
        },
        async (err, data) => {
            if(err) console.log(err);
            if(!data) {
              Profile.insertMany({
                guildId: message.guild.id,
                userId: message.author.id,
                level: 0,
                xp: 15,
                last_message: 60000,
                total_xp: 15,
            });
            
        } else {
            let levelupChannel = 'ᴀʟʟɢᴇᴍᴇɪɴ🎮';
            const levelup = message.guild.channels.cache.find(channel => channel.name === levelupChannel);
            if(Date.now() - data.last_message > 10000) {
                let randomXP = random.int(15, 25);
                data.xp += randomXP;
                data.total_xp + randomXP;
                data.last_message = Date.now();
                const xpToNextLevel = 5 * Math.pow(data.level, 2) + 5 * data.level + 100;
                if(data.xp >= xpToNextLevel) {
                   data.level++;
                   data.xp = data.xp - xpToNextLevel;
                   levelup.send(`<@${message.author.id}> has reached Level **${data.level}**!`);
                };
            }
            data.save().catch(err => console.log(err));
        }
        
    }
    

);
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if(cmd == 'rank') {
        bot.commands.get('rank').execute(message, args, mongoose, Discord);
    }
    if(cmd === 'leaderboard') {
        bot.commands.get('leaderboard').execute(message, args, mongoose, Discord);
    }
    if(cmd === 'poll') {
        let pollChannl = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');
        let Poll = new Discord.MessageEmbed()
        .setTitle(`A new Poll has been made by ${message.author.username}!`)
        .setDescription(pollDescription)
        .setColor(0xFF0000);
        let msg = await pollChannl.send(Poll);
        await msg.react('👍');
        await msg.react('👎');
    }
    let invitation = await 'https://discord.com/api/oauth2/authorize?client_id=856934608918020156&permissions=8&scope=bot';
    if(cmd === 'invite') {
        let Timestamp = Date.now();
        let invite = new Discord.MessageEmbed()
        .setTitle(`Invitation link for ${bot.user.username} to your Server!`)
        .setDescription(`Um den Discord Bot einzuladen, [Klick hier!](${invitation})`)
        .setColor(0xFF0000)
        .setThumbnail(bot.user.displayAvatarURL())
        .setFooter(`requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setTimestamp(Timestamp);
        message.channel.send(invite);
        
    }
    
    if(cmd === 'join') {
        bot.emit('guildMemberAdd', message.member);
    }
   
});
bot.login(process.env.TOKEN);