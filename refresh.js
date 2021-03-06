const client = require('cheerio-httpcli');
const fs = require('fs');

class refresh {
    refreshstart() {
        var arr = [];
        for (let step = 0; step < 9; step++) {
            const temp = fs.readFileSync('./tag.json', 'utf8');
            const truarr = JSON.parse(temp)
            let url = `http://board.sejong.ac.kr/boardlist.do?bbsConfigFK=${truarr[step].key}`;
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
                if ($(key).find(".index").text() !== truarr[step].index) {
                    arr.push({
                        key: truarr[step].key,
                        flag: "1",
                        index: $(key).find(".index").text(),
                        subject: $(key).find("td.subject > a").text().replaceAll('\t', '').replaceAll('\n', ''),
                        link: `http://board.sejong.ac.kr/${$(key).find("td.subject > a").attr("href")}`
                    })
                }
                else {
                    arr.push({
                        key: truarr[step].key,
                        flag: "0",
                        index: $(key).find(".index").text(),
                        subject: $(key).find("td.subject > a").text().replaceAll('\t', '').replaceAll('\n', ''),
                        link: `http://board.sejong.ac.kr/${$(key).find("td.subject > a").attr("href")}`
                    })
                }
                if (step === 8) {
                    const webJson = JSON.stringify(arr);
                    fs.writeFileSync('./tag.json', webJson);
                }
            }
            )
        }

    }
}

module.exports = refresh;