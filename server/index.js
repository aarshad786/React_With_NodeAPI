const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const serverConfig = require("./config/server");

const participantRoutes = require('./routes/participant')

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});


app.use(async function (req, res, next) {
    //Enabling CORS
    try {
        await next();
    } catch(err) {
        res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
})

//Add all routes
app.use('/api/participant', participantRoutes);



//Setting up server
var server = app.listen(process.env.PORT || serverConfig.port, function () {
    console.log("App now running on port", server.address().port);
});