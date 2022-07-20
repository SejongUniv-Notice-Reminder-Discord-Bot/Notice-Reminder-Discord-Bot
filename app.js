const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"], partials: ["CHANNEL"] });
const token = require("./token.json");
const web = require("./web.js")
const fs = require('fs');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (msg) => {
    const web1 = new web();
    function fun() {
        return new Promise((res, rej) => {
            setTimeout(() => {
                const temp = fs.readFileSync('./temp.json', 'utf8');
                arr = JSON.parse(temp)
                msg.reply(arr[0].subject + arr[0].link)
            }, 800)
        })
    }
    if (msg.content === "!일반") {
        web1.webstart("333")
        fun();
    }
    else if (msg.content === "!입학") {
        web1.webstart("334")
        fun()
    }
    else if (msg.content === "!학사") {
        web1.webstart("335")
        fun()
    }
    else if (msg.content === "!국제교류") {
        web1.webstart("336")
        fun()
    }
    else if (msg.content === "!취업") {
        web1.webstart("337")
        fun()
    }
    else if (msg.content === "!장학") {
        web1.webstart("338")
        fun()
    }
    else if (msg.content === "!교내모집") {
        web1.webstart("339")
        fun()
    }
    else if (msg.content === "!입찰공고") {
        web1.webstart("340")
        fun()
    }
    else if (msg.content === "!경시대회/공모전") {
        web1.webstart("341")
        fun()
    }
});


client.login(token.token);