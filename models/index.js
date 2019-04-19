var db = require("../config");
var moment = require('moment');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {

  save: function (req, res) {

    // Search for duplicate companies
    db.Companies.find({
      name: req.body.company_name,
      address: `${req.body.street_number} ${req.body.route}`,
      city: req.body.locality,
      state: req.body.administrative_area_level_1,
      zipcode: req.body.postal_code
    }).then(function (companyResult) {

      // If no duplicates
      if (companyResult.length === 0) {

        // Add company in Companies database
        db.Companies
          .create({
            name: req.body.company_name,
            address: `${req.body.street_number} ${req.body.route}`,
            city: req.body.locality,
            state: req.body.administrative_area_level_1,
            zipcode: req.body.postal_code,
            entry_date: moment().toDate()
          })
          .then(function (dbCompanies) {

            // Add count entry in Count database
            db.Counts.create({
              entry_date: moment().toDate()
            })
              .then(function (dbCount) {

                // Add Count id to Company id - countId
                db.Companies.update({ _id: dbCompanies.id },
                  { $push: { countId: dbCount.id } })
                  .then(function (dbUser) {

                    // Send back that the company was saved
                    res.json({ companyInfo: 'saved' });
                  })
                  .catch(err => res.status(422).json(err));
              })
          })
      }

      // Company is a duplicate
      else {

        // Return company information
        let companyInfo = {
          id: companyResult[0]._id,
          countId: companyResult[0].countId
        }

        res.json(companyInfo);
      }
    })
  },

  // Report company already in the database
  report: function (req, res) {

    // Add count entry in Count database
    db.Counts.create({
      entry_date: moment().toDate()
    })
      .then(function (dbCount) {

        // Add Count id to Company id
        db.Companies.update({ _id: req.body.id },
          { $push: { countId: dbCount.id } })
          .then(function () {

            // Send back that the company was saved
            res.json({ companyInfo: 'count added' });
          })
          .catch(err => res.status(422).json(err));
      })
  }







  // findAll: function(req, res) {
  //   db.Book
  //     .find(req.query)
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // findById: function(req, res) {
  //   db.Book
  //     .findById(req.params.id)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // create: function(req, res) {
  //   db.Book
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // update: function(req, res) {
  //   db.Book
  //     .findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.Book
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
