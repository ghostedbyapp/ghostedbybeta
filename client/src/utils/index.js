import axios from "axios";

export default {
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

  // // Get saved books
  // getSavedBooks: function () {
  //   return axios.get("/api/savedBooks");
  // },


  // // Deletes the book with the given id
  // deleteBook: function (id) {
  //   return axios.delete("/api/books/" + id);
  // },

};
