// api/layout.js
const router = require('express').Router();
const fetch = require('isomorphic-unfetch');

// TODO: maybe replace unfetch with axios

router.get('/', (req, res) => {
    console.log("HTTP GET on /api/layout/");
    let uri = `http://localhost:3002/api/layout`
    if(process.env.PRODUCTION) {
        uri = "http://gonzaga-iot-back.azurewebsites.net/api/layout"
    }
    fetch(uri)
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