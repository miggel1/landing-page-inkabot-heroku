//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
//app.use(express.static(__dirname + '/dist/landing-page-inkabot-heroku'));
app.use(express.static('${__dirname}/front-end/dist/'));

app.get('*', function(req, res){
    res.sendFile(`./front-end/dist/index.html`);
    
    /*res.sendFile(path.join(__dirname + 
        '/dist/landing-page-inkabot-heroku/index.html'));*/
});

/*
app.get('/*', function(req, res){
    res.sendFile('index.html', { root: 'dist/landing-page-inkabot-heroku/' }
    );
    /*res.sendFile(path.join(__dirname + 
        '/dist/landing-page-inkabot-heroku/index.html'));
});
*/ 

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);