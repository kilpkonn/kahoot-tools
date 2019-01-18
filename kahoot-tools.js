const config = require("./config.json");
const fs = require("fs");
const NameCreator = require("./names.js");
const nameCreator = new NameCreator();

if (!fs.existsSync("./dist")) {
    console.log("Error, please run: `npm run build` before launching the server!")
} else {
    const corsAnywhere = require("cors-anywhere");
    const express = require("express");
    const app = express();

    const host = config.host;
    const appPort = config.appPort;
    const corsPort = config.corsPort;

    app.use(express.static("./dist"));

    app.listen(appPort, () => {
        console.log("Running server on port " + appPort);
    });

    app.get('/names/:count', function (req, res) {
        let count = parseInt(req.params.count);
        console.log("Generating names! count: " + count);
        res.json(nameCreator.generateNames(count))
    });

    corsAnywhere.createServer({
        originWhitelist: [],
        requireHeader: ["origin", "x-requested-with"],
    }).listen(corsPort, host, function () {
        console.log("Running CORS Anywhere on port " + corsPort);
    });
}
