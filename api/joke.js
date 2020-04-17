// api/joke.js
const router = require('express').Router();
const fetch = require("isomorphic-unfetch");
//const apiCreds = require("../creds/api-keys.json");

router.get('/', (req, res) => {
    console.log("HTTP GET on /api/joke/");
    fetch('https://official-joke-api.appspot.com/jokes/random')
        .then((joke) => {
            joke.json()
                .then((jsjoke) => {
                    res.json({ setup: jsjoke.setup, punchline: jsjoke.punchline });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })

});

module.exports = router;