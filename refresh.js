const client = require('cheerio-httpcli');
const fs = require('fs');

class refresh {
    async refreshstart() {
        var arr = [];
        const temp = fs.readFileSync('./tag.json', 'utf8');
        const truarr = JSON.parse(temp)
        function tagRefresh(step) {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    let url = `http://board.sejong.ac.kr/boardlist.do?bbsConfigFK=${truarr[step].key}`;
                    client.set('headers', {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                        'Accept-Charset': 'utf-8'
                    });
                    res(url)
                }, 500)
            })
        }
        for (let step = 0; step < 9; step++) {
            await tagRefresh(step).then((url) => {
                const param = {};
                client.fetch(url, param, function (err, $, res) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(url)
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
                })
            })
        }
    }
}
module.exports = refresh;