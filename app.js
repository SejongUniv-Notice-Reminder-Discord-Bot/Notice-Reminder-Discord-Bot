const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"], partials: ["CHANNEL"] });
const token = require("./token.json");
const web = require("./web.js");
const refresh = require("./refresh.js");
const tag = require("./tag.json");
const fs = require('fs');
const PB = require("./phonebook.json");
const manual = require("./manual.json");

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
    if (msg.content === "!일반" || msg.content === "!공지") {
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
    else if (msg.content === "!전화번호") {
        const Embed = new Discord.MessageEmbed()
            .setTitle("교내 시설 전화번호 준비!!!! 시작!!!!!");
        msg.channel.send({ embeds: [Embed] });
        for (let i = 0; i < 21; i++) {
            const Embed = new Discord.MessageEmbed()
                .setDescription(`부서: ${PB[i].department}\n 번호:${PB[i].number}\n\n`);
            msg.channel.send({ embeds: [Embed] });
        }
        const Embed1 = new Discord.MessageEmbed()
            .setTitle("교내 시설 전화번호 끝!!!!!!!");
        msg.channel.send({ embeds: [Embed1] });

        /*
        "department": "교무과",
        "position": "직원",
        "name": "박윤주",
        "location": "집협관 101호",
        "number": "02-3408-4192"*/
    }
    else if (msg.content === "!수강편람") {
        const Embed = new Discord.MessageEmbed()
            .setTitle("수강편람")
            .setDescription(manual.subject)
            .setURL(manual.link);
        msg.channel.send({ embeds: [Embed] });
    }
    else if (msg.content === '!help') {
        const Embed = new Discord.MessageEmbed()
            .setTitle("공지사항 도우미!!")
            .setDescription("!일반: 일반공지사항\n\n !입학: 학부입학관련\n\n !국제교류: 외국인 학부 / 대학원 입시, 해외 파견 / 유치 프로그램, 외국인 지원, 외국인 기숙사 등\n\n !취업: 취업 관련\n\n !장학: 장학 관련\n\n !교내모집: 조교, 근로학생등 교내 모집 공고\n\n	!입찰공고: 각종입찰 관련 공고\n\n !경시대회 / 공모전: 교내 및 교외 경시대회 및 공모전 안내\n\n    !전화번호: 교내 시설 및 학부 조교실 전화번호\n\n  !수강편람: 학번별 수강편람 정보 안내")
        msg.channel.send({ embeds: [Embed] });
    }
});

const refresh1 = new refresh();

setInterval(function () {
    setTimeout(async function () {
        function readfun(step) {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    const temp = fs.readFileSync('./tag.json', 'utf8');
                    arr = JSON.parse(temp);
                    const Embed = new Discord.MessageEmbed()
                        .setTitle(arr[step].subject)
                        .setURL(arr[step].link)
                    client.channels.cache.get('994189428903911476').send({ embeds: [Embed] });
                }, 5000)
            })
        }
        const temp = fs.readFileSync('./tag.json', 'utf8');
        arr = JSON.parse(temp);
        refresh1.refreshstart();
        for (step = 0; step < 9; step++) {
            if (arr[step].flag === "1") {
                readfun(step);
            }
        }
    }, 3000);
}, 36000000);

client.login(token.token);