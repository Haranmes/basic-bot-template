const GuildConfig = require("../levelModules/GuildConfig");
const Profile = require("../levelModules/Profile");
const canvacord = require("canvacord");
const Discord = require('discord.js');
    module.exports = {
    name:'rank',
    description: 'gives back the rank of user',
    execute(message, args, mongoose) {
    
    Profile.find({
        guildId: message.guild.id,
    })
    .sort([["total_xp", "descending"]])
    .exec(async(err, res) => {
    if(err) return console.log(err);
    if(!res.length) return message.channel.send("Weird, no one has gathered xp!");
    const user = message.mentions.users.first();
    if(!user) {
    for(let i = 0; i < res.length; i++) {
        if(res[i].userId != message.author.id) {
            if(i >= res.length - 1 ) {
               return; 
            } else {
                continue;
            }
        } else {
            const xpToNextLevel = 5 * Math.pow(res[i].level, 2) + 5 * res[i].level + 100;
            const rankCard = new canvacord.Rank()
                            .setAvatar(message.author.displayAvatarURL({format: "png"}))
                            .setRequiredXP(xpToNextLevel)
                            .setCurrentXP(res[i].xp)
                            .setLevel(res[i].level)
                            .setUsername(message.author.username)
                            .setProgressBar('#FF0000', "COLOR")
                            .setDiscriminator(message.author.discriminator)
                            .setRank(i  + 1)
                            .setBackground("IMAGE", 'IMAGE_NAME');
            rankCard.build().then((data) => {
                const attatchement = new Discord.MessageAttachment(data, 'UrRankCard.png');
                message.channel.send(attatchement);
            });
                    
        }    
    }

} else {
    for(let i = 0; i < res.length; i++) {
        if(res[i].userId != user.id) {
            if(i >= res.length - 1 ) {
               return; 
            } else {
                continue;
            }
        } else {
            const xpToNextLevel = 5 * Math.pow(res[i].level, 2) + 5 * res[i].level + 100;
            const rankCard = new canvacord.Rank()
                            .setAvatar(user.displayAvatarURL({format: "png"}))
                            .setRequiredXP(xpToNextLevel)
                            .setCurrentXP(res[i].xp)
                            .setLevel(res[i].level)
                            .setUsername(user.username)
                            .setProgressBar('#FF0000', "COLOR")
                            .setDiscriminator(user.discriminator)
                            .setRank(i  + 1)
                            .setBackground("IMAGE", 'IMAGE_NAME');
            rankCard.build().then(() => {
                const attatchement = new Discord.MessageAttachment(data, 'UrRankCard.png');
                message.channel.send(attatchement);
           
            });
        }
    }
}

});

}
}