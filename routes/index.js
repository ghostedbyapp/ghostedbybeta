const path = require("path");

module.exports = function (app) {

    // Send every other request to the React app
    // If no API routes are hit, send the React app
    app.use(function (req, res) {
        // res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
}