// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
    if (!req.params.date || req.params.date.trim() === "") {
      const dateTime =  new Date();
      const unix = dateTime.getTime();
      const utc = dateTime.toUTCString();
      return res.json({unix, utc});
    }

    let dateTime
    let dateString
    
    dateString = req.params.date
    if (isNaN(dateString) == true) {
      dateTime = new Date(dateString);
    } else {
      dateTime = new Date(+dateString);
    }

    if (dateTime.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    } 

    const unix = dateTime.getTime();
    const utc = dateTime.toUTCString();
    return res.json({unix, utc});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
