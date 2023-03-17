const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"], partials: ["CHANNEL"] });
const token = require("./token.json");
const web = require("./web.js");
const refresh = require("./refresh.js");
const refresh1 = new refresh()
const fs = require('fs');

const PB = require("./phonebook.json");
const manual = require("./manual.json");

const db = require('./db');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    db.connect();   // DB Connect
});

client.on('messageCreate', async (msg) => {
    const web1 = new web();
    function fun() {
        return new Promise((res, rej) => {
            setTimeout(() => {
                
                const temp = fs.readFileSync('./temp.json', 'utf8');
                const arr = JSON.parse(temp)
                
                for (let i = 0; i < 5; i++) {
                    const Embed = new Discord.MessageEmbed()
                        .setTitle(arr[i].subject)
                        .setURL(arr[i].link)
                    msg.channel.send({ embeds: [Embed] });
                }
            }, 800)
        })
    }
    if (msg.content === "!일반" || msg.content === "!공지") {
        //console.log("일반");
        web1.webstart("333");
        fun();
    }
    else if (msg.content === "!입학") {
        web1.webstart("334");
        fun();
    }
    else if (msg.content === "!학사") {
        web1.webstart("335");        
        fun();
    }
    else if (msg.content === "!국제교류") {
        web1.webstart("336");
        fun();
    }
    else if (msg.content === "!취업") {
        web1.webstart("337");
        fun();
    }
    else if (msg.content === "!장학") {
        web1.webstart("338");
        fun();
    }
    else if (msg.content === "!교내모집") {
        web1.webstart("339");
        fun();
    }
    else if (msg.content === "!입찰공고") {
        web1.webstart("340");
        fun();
    }
    else if (msg.content === "!경시대회/공모전") {
        web1.webstart("341");
        fun();

    }
    else if (msg.content === "!전화번호") {
        const Embed = new Discord.MessageEmbed()
            .setTitle("교내 시설 전화번호 시작!!!!!");
        msg.channel.send({ embeds: [Embed] });
        for (let i = 0; i < 21; i++) {
            const Embed = new Discord.MessageEmbed()
                .setDescription(`부서: ${PB[i].department}\n 번호:${PB[i].number}\n\n`);
            msg.channel.send({ embeds: [Embed] });
        }
        const Embed1 = new Discord.MessageEmbed()
            .setTitle("교내 시설 전화번호 끝!!!!!!!");
        msg.channel.send({ embeds: [Embed1] });

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

setInterval(async function () {

    function readfun() {
        return new Promise((res, rej) => {
            res(refresh1.refreshstart());
        })
    }
    readfun().then(() => {

        const connection = db.return_connection();

        const SQL = 'select * from tag where JSON_EXTRACT(data,\'$.flag\') = "1";';
        connection.query(SQL,function(err,results,fields){
            if(!results || results.length === 0){
                return ;
            }
            const newEmbed = new Discord.MessageEmbed()
                    .setTitle("새로운 공지사항입니다")
                    client.channels.cache.get('816574213573967892').send({ embeds: [newEmbed] });
            
            results.map(notice=>{
                if(JSON.parse(notice.data).flag==="1"){
                    let m_tag = " ";
                    if(JSON.parse(notice.data).key==="333"){
                        m_tag = "일반";
                    }
                    else if(JSON.parse(notice.data).key==="335"){
                        m_tag = "학사";
                    }
                    else if(JSON.parse(notice.data).key==="336"){
                        m_tag = "국제교류";
                    }
                    else if(JSON.parse(notice.data).key==="337"){
                        m_tag = "취업";
                    }
                    else if(JSON.parse(notice.data).key==="338"){
                        m_tag = "장학";
                    }
                    else if(JSON.parse(notice.data).key==="339"){
                        m_tag = "교내모집";
                    }
                    else if(JSON.parse(notice.data).key==="340"){
                        m_tag = "입찰공고";
                    }
                    const Embed = new Discord.MessageEmbed()
                        .setTitle("[" + m_tag + "] " + JSON.parse(notice.data).subject)
                        .setURL(JSON.parse(notice.data).link)
                    client.channels.cache.get('816574213573967892').send({ embeds: [Embed] });
                }
            });
        });

    });
}, 1200000); //20분마다 공지사항 모니터링


client.login(token.token);
