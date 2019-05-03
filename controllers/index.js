var model = require("../models");

module.exports = function (app) {

    // Save Company
    app.post("/api/company", model.save);

    // Report Company
    app.post("/api/report", model.report);

    // Search a Company
    app.get("/api/company/:company_name", model.search)

    // Load Lifetime Companies
    // app.get("/api/loadLifetimeCompanies", model.loadLifetime);
    // Load All Companies
    app.get("/api/loadAllCompanies", model.loadAllCompanies);

    // Load Top 10 Companies
    app.get("/api/loadTop10Companies", model.loadTop10Companies);

    // Load last 30 days
    app.get("/api/last30days", model.last30days);

    // Load last 7 days
    app.get("/api/last7days", model.last7days);

    app.get("/api/getdatabase", model.getDatabase);

    // Test route to get all database info for the admin page
    // app.get("/api/getdatabase", model.getCompaniesAndReports);
}
