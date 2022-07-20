const client = require('cheerio-httpcli');
const fs = require('fs');
const tag = require('./tag.json');

class refresh {
    refreshstart() {
        var arr = [];
        for (let step = 0; step < 7; step++) {
            let url = `http://board.sejong.ac.kr/boardlist.do?bbsConfigFK=${tag[step].key}`;

            const param = {};
            client.set('headers', {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                'Accept-Charset': 'utf-8'
            });
            client.fetch(url, param, function (err, $, res) {
                if (err) {
                    console.log(err);
                    return;
                }
                const key = "tr:nth-child(1)"
                if (String($(key).find(".index").text()) !== tag[step].index) {
                    tag[step].flag = "1";
                    arr.push({
                        key: tag[step].key,
                        flag: tag[step].flag,
                        index: $(key).find(".index").text(),
                        subject: $(key).find("td.subject > a").text().replaceAll('\t', '').replaceAll('\n', ''),
                        link: `http://board.sejong.ac.kr/${$(key).find("td.subject > a").attr("href")}`
                    })
                }
                else {
                    tag[step].flag = "0";
                    arr.push({
                        key: tag[step].key,
                        flag: tag[step].flag,
                        index: tag[step].index,
                        subject: tag[step].subject,
                        link: tag[step].link
                    })
                }
                if (step === 6) {
                    console.log(arr)
                    const webJson = JSON.stringify(arr);
                    fs.writeFileSync('./tag.json', webJson);
                }
            }
            )
        }

    }
}

module.exports = refresh;