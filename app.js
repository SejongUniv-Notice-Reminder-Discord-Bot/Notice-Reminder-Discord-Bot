const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"], partials: ["CHANNEL"] });
const token = require("./token.json");
const temp = require("./temp.json");
const web = require("./web.js");
const refresh = require("./refresh.js");
const tag = require("./tag.json");
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
                const arr = JSON.parse(temp)
                for (let i = 0; i < 3; i++) {
                    const Embed = new Discord.MessageEmbed()
                        .setTitle(arr[i].subject)
                        .setURL(arr[i].link)
                    msg.channel.send({ embeds: [Embed] });
                }
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
    else if (msg.content === '!help') {
        const Embed = new Discord.MessageEmbed()
            .setTitle("공지사항 도우미!!")
            .setDescription("!일반: 일반공지사항\n\n !입학: 학부입학관련\n\n !국제교류: 외국인 학부 / 대학원 입시, 해외 파견 / 유치 프로그램, 외국인 지원, 외국인 기숙사 등\n\n !취업: 취업 관련\n\n !장학: 장학 관련\n\n !교내모집: 조교, 근로학생등 교내 모집 공고\n\n	!입찰공고: 각종입찰 관련 공고\n\n !경시대회 / 공모전: 교내 및 교외 경시대회 및 공모전 안내")

        msg.channel.send({ embeds: [Embed] });
    }
});

const refresh1 = new refresh();

setInterval(function () {
    setTimeout(async function () {

        function fun(step) {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    const temp = fs.readFileSync('./tag.json', 'utf8');
                    arr = JSON.parse(temp);
                }, 800)
            })
        }
        refresh1.refreshstart();
        for (step = 0; step < 7; step++) {
            if (tag[step].flag === "1") {
                fun(step);
            }
        }
    }, 3000);
}, 3000);

client.login(token.token);