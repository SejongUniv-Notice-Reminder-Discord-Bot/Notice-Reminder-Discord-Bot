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
        const arr = web1.webstart("334")
        console.log(arr)
        await msg.reply(arr[0].subject + arr[0].link)
    }
});


client.login(token.token);