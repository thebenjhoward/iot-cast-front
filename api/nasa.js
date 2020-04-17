// api/nasa.js
const router = require('express').Router();
const fetch = require("isomorphic-unfetch");
const axios = require('axios').default;
const apiCreds = require("../creds/api-keys.json");

router.get('/', (req, res) => {
    console.log("HTTP GET on /api/nasa/");
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiCreds.nasa_api}`)
        .then((apiRes) => res.json(apiRes.data))
        .catch(err => res.status(500).json(err));

});

module.exports = router;