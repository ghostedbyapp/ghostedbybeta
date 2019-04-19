var model = require("../models");

module.exports = function (app) {

    // Save Company
    app.post("/api/company", model.save);

    // Report Company
    app.post("/api/report", model.report);

    // // Delete Book
    // app.delete("/api/books/:id", model.remove);
}
