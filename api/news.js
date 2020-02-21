// api/news.js
const router = require('express').Router();
const fetch = require("isomorphic-unfetch");
const apiCreds = require("../creds/api-keys.json");

router.get('/', (req, res) => {
    console.log("HTTP GET on /api/news/");
    fetch(`http://newsapi.org/v2/top-headlines?country=us&apiKey=${apiCreds.news_api}`)
        .then((news) => {
            news.json()
                .then((jsnews) => {
                    res.json(jsnews);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send(err);
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        })

});

module.exports = router;