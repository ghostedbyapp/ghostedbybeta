import axios from "axios";

export default {
  // Search a company without saving
  searchCompany: function(companyInfo) {
    console.log("axios:", companyInfo)
    return axios.get("/api/company/" + companyInfo)
  },

  // Saves a Company info to the database
  saveCompany: function (companyInfo) {
    return axios.post("/api/company", companyInfo);
  },

  // Saves a Company info to the database
  reportCompany: function (companyInfo) {
    return axios.post("/api/report", companyInfo);
  },

  // Load top 10 companies from the database
  loadLifetimeCompanies: function () {
    return axios.get("/api/loadLifetimeCompanies");
  },

  // Load last 30 days from the database
  last30days: function () {
    return axios.get("/api/last30days");
  },

  // Load last 30 days from the database
  last7days: function () {
    return axios.get("/api/last7days");
  }
  
};
