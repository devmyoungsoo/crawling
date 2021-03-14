const express = require('express');

const cors = require('cors');
const cheerio = require('cheerio');
const axios = require('axios');

// config
const port = 3000

const app = express()

const getHTML = async () => {
    try {
        return await axios.get("http://ncov.mohw.go.kr/");
    } catch (error) {
        console.log(error);
    }
}

app.get('/', async (req, res)=> {
    const html = await getHTML();
    const $ = cheerio.load(html.data);
    let parentTag = $("div.liveNum ul.liveNum li");
    let resultArr = [];
    parentTag.each(function (i, elem) {
        let itemObj = {
            text: $(this).find("strong").text(),
            num: $(this).find("span").text(),
        };
        resultArr.push(itemObj);
    });

    res.send(resultArr);
})

app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`)
})