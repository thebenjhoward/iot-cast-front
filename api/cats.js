// api/cats.js
const router = require('express').Router();
const fetch = require("isomorphic-unfetch");
//const apiCreds = require("../creds/api-keys.json");

router.get('/', (req, res) => {
    console.log("HTTP GET on /api/cats/");
    fetch('https://cat-fact.herokuapp.com/facts')
        .then((cats) => {
            cats.json()
                .then((jscats) => {
                    res.json(jscats.all[Math.floor((Math.random() * jscats.all.length))].text);
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