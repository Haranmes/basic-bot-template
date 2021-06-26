const GuildConfig = require("../levelModules/GuildConfig");
const Profile = require("../levelModules/Profile");
const canvacord = require("canvacord");
const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
    name: 'leaderboard',
    description: 'Generates a leaderboard of all users of a server',
    execute(message, args) {
        Profile.find({
            guildId: message.guild.id,
        })
        .sort([["level", "descending"]])
        .exec(async(err, res) => {
        if(err) return console.log(err);
        let le = new Discord.MessageEmbed()   
        .setColor(0xFF0000)
        .setTitle(`Leaderboard of **${message.guild.name}**`)
        .setThumbnail(message.guild.iconURL());       
        for(let i = 0; i < res.length; i++) {
            le.addField('Rang: ', i + 1, true)
            .addField('Name: ', `<@${res[i].userId}>`, true)
            .addField('Level: ', res[i].level, true)  
        }
        message.channel.send(le);
    });
    }
}
