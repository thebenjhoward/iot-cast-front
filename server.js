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

    // add api endpoints
    // app.use('/api/{end}', require('./api/routes/{router}));

    
    app.get('*', (req, res) => {
        return (handle(req, res));
    });

    app.listen(PORT, (err) => {
        if(err) throw err;
        console.log(`Ready at localhost:${PORT}`);
    });

});