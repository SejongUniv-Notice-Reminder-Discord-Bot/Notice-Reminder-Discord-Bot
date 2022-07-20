const client = require('cheerio-httpcli');
const fs = require('fs');

class web {

    async webstart(arlkey) {
        const url = `http://board.sejong.ac.kr/boardlist.do?bbsConfigFK=${arlkey}`;
        const param = {};
        client.set('headers', {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
            'Accept-Charset': 'utf-8'
        });
        client.fetch(url, param, function (err, $, res) {
            const arr = [];
            if (err) {
                console.log(err);
                return;
            }
            for (let i = 1; i < 4; i++) {
                const key = `tr:nth-child(${i})`
                arr.push({
                    index: $(key).find(".index").text(),
                    subject: $(key).find("td.subject > a").text().replaceAll('\t', '').replaceAll('\n', ''),
                    link: `http://board.sejong.ac.kr/${$(key).find("td.subject > a").attr("href")}`
                })
            }
            const webJson = JSON.stringify(arr)
            fs.writeFileSync('./temp.json', webJson)
        });
    }
}

module.exports = web