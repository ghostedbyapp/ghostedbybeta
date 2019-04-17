import axios from "axios";

export default {
  // Saves a Company info to the database
  saveCompany: function (companyInfo) {
    return axios.post("/api/company", companyInfo);
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
