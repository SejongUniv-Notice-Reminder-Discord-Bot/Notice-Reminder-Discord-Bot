const client = require('cheerio-httpcli');
const fs = require('fs');
const db = require('./db');

class refresh {
    async refreshstart() {
        var arr = [];

        const temp = fs.readFileSync('./tag.json', 'utf8');
        const truarr = JSON.parse(temp)
        function tagRefresh(key) {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    let url = `http://board.sejong.ac.kr/boardlist.do?bbsConfigFK=${key}`;
                    client.set('headers', {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                        'Accept-Charset': 'utf-8'
                    });
                    res(url)
                }, 500)
            })
        }

        //JSON 대신 DB
        const connection = db.return_connection();
        let SQL = 'select JSON_EXTRACT( data, \'$.key\' ) as "key", JSON_EXTRACT( data, \'$.index\' ) as "index" from tag;';
        
        await connection.query(SQL,function(err,results,fields){
            results.map(data=>{
                tagRefresh(data.key).then((url) => {
                    const param = {};
                    client.fetch(url, param, function (err, $, res) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        
                        let key = "tr:nth-child(1)"; 
                        //338인 경우 child 4
                        if(JSON.parse(data.key)=="338"){
                            key = "tr:nth-child(4)";
                        }
                        const updateSQL = 'update tag set data = JSON_SET(data,\'$.flag\', ?,\'$.index\', ?,\'$.subject\', ?,\'$.link\', ?) where JSON_EXTRACT( data, \'$.key\' ) = ?;';

                        //console.log($(key).find(".index").text());
                        let flag = "0";
                        if(($(key).find(".index").text() !== JSON.parse(data.index))===true){
                            flag = "1";
                        }
                        const index = $(key).find(".index").text();
                        const subject = $(key).find("td.subject > a").text().replaceAll('\t', '').replaceAll('\n', '');
                        
                        const link = `http://board.sejong.ac.kr/${$(key).find("td.subject > a").attr("href")}`;
                        //,\'$.index\'=?,\'$.subject\'=?,\'$.link\'=?
                        connection.query(updateSQL,[flag, index, subject, link, JSON.parse(data.key)], function(err,results,fields){
                            if(err){
                                console.log(err);
                                return ;
                            }
                            //console.log(subject);
                            //console.log(results);
                            //console.log(results);
                            //console.log(data.key);
                        })

                        /*
                        if ($(key).find(".index").text() !== data.index) {
                            arr.push({
                                key: data.key,
                                flag: "1",
                                index: $(key).find(".index").text(),
                                subject: $(key).find("td.subject > a").text().replaceAll('\t', '').replaceAll('\n', ''),
                                link: `http://board.sejong.ac.kr/${$(key).find("td.subject > a").attr("href")}`
                            })
                        }
                        else {
                            arr.push({
                                key: data.key,
                                flag: "0",
                                index: $(key).find(".index").text(),
                                subject: $(key).find("td.subject > a").text().replaceAll('\t', '').replaceAll('\n', ''),
                                link: `http://board.sejong.ac.kr/${$(key).find("td.subject > a").attr("href")}`
                            })
                        }
                        */                                                
                    });
                });
            })
        });

        /*
        const webJson = JSON.stringify(arr);

        SQL = 'update tag flag = ?, set index = ?, subject = ?, link = ? where key = ?;';

        console.log(arr);
        await arr.map(data=>{
            console.log(data);
            connection.query(SQL,[data.flag,data.index,data.subject,data.link,data.key],function(err,results,fields){
                if(err){
                    console.log(err);
                    return ;
                }
            })
        })

        /*
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
        */

    }
}
module.exports = refresh;