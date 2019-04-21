var model = require("../models");

module.exports = function (app) {

    // Save Company
    app.post("/api/company", model.save);

    // Report Company
    app.post("/api/report", model.report);

    // Load Lifetime Companies
    app.get("/api/loadLifetimeCompanies", model.loadLifetime);

    // Load last 30 days
    app.get("/api/last30days", model.last30days);

    // Load last 7 days
    app.get("/api/last7days", model.last7days);
}
