const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"], partials: ["CHANNEL"] });
const token = require("./token.json");
const temp = require("./temp.json");


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
    if (msg.content === 'notify') {
        //const msgemb = new Discord.MessageEmbed().setDescription('[' + temp.subject + '](' + temp.link + ')');
        //const msgemb = new Discord.MessageEmbed().setDescription('[Sejong.Univ Notify Reminder](' + temp.link + ')');
        //client.channels.cache.get('994189428903911476').send(msgemb);
        msg.reply(temp.subject + temp.link)
    }
    if (msg.content === '일반') {

    }
});


client.login(token.token);