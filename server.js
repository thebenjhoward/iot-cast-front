// server.js
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== "dev";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();


nextApp.prepare().then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));

    // add api endpoints
    app.use('/api/news', require('./api/news'));
    app.use('/api/layout', require('./api/layout'));
    app.use('/api/nasa', require('./api/nasa'));
    app.use('/api/joke', require('./api/joke'));
    app.use('/api/cats', require('./api/cats'));
    app.use('/i', express.static(__dirname + '/img'));
    
    app.get('*', (req, res) => {
        return (handle(req, res));
    });

    app.listen(PORT, (err) => {
        if(err) throw err;
        console.log(`Ready at http://localhost:${PORT}`);
    });

});