var model = require("../models");

module.exports = function (app) {

    // Save Company
    app.post("/api/company", model.save);

    // // Get Saved Books
    // app.get("/api/savedBooks", model.load);

    // // Delete Book
    // app.delete("/api/books/:id", model.remove);
}
