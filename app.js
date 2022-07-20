const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"], partials: ["CHANNEL"] });
const token = require("./token.json");
const temp = require("./temp.json");
const web = require("./web.js")


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (msg) => {
    const web1 = new web();
    if (msg.content === '일반') {
        web1.webstart("334")
        await msg.reply(temp[0].subject + temp[0].link)
    }
});


client.login(token.token);