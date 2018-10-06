const express = require('express');
const Fortnite = require('fortnite-api');
const path = require('path');
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(express.static( __dirname + '/public/dist' ));

const fortniteAPI = new Fortnite(
    [
        "dansk1731@gmail.com",
        "justforapi111",
        "MzRhMDJjZjhmNDQxNGUyOWIxNTkyMTg3NmRhMzZmOWE6ZGFhZmJjY2M3Mzc3NDUwMzlkZmZlNTNkOTRmYzc2Y2Y=",
        "ZWM2ODRiOGM2ODdmNDc5ZmFkZWEzY2IyYWQ4M2Y1YzY6ZTFmMzFjMjExZjI4NDEzMTg2MjYyZDM3YTEzZmM4NGQ="
    ],
    {
        debug: true
    }
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/fortniteStatistics/api/info', function (req, res) {
    app.player = req.body.player;
    app.platform = req.body.platform;
    request({
        url: 'https://api.fortnitetracker.com/v1/profile/'+req.body.platform+'/'+req.body.player,
        headers: {'TRN-Api-Key': 'c7f953e4-8b85-4ac0-a56b-c2a9c61b5a88'}
    }).pipe(res);
});

app.get('/fortniteStatistics/api/news', function(req, res) {
    fortniteAPI.login().then(() => {
        fortniteAPI
            .getFortniteNews("en")
            .then(news => {
                res.json(news);
            })
            .catch(err => {
                res.json(err);
            });
    });
});

// app.all("*", (req,res,next) => {
//     res.json({error: 'Error'});
// });

module.exports = app;