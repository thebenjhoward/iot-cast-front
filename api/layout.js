// api/layout.js
const router = require('express').Router();
const fetch = require('isomorphic-unfetch');

router.get('/', (req, res) => {
    console.log("HTTP GET on /api/layout/");
    fetch(`http://localhost:3002/api/layout`)
        .then((layout) => {
            layout.json()
                .then((jslayout) => {
                    res.json(jslayout);
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