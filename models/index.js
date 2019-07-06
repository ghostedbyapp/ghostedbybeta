var db = require("../config");
var moment = require('moment');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  getDatabase: function(req, res) {
    db.Companies.aggregate([
      { $unwind: '$countId' },
      { $group: { _id: '$_id', name: { $first: '$name' }, state: { $first: '$state' }, city: { $first: '$city' }, address: { $first: '$address' }, zipcode: { $first: '$zipcode' }, lat: { $first: '$lat' }, lng: { $first: '$lng' }, countIds: { $sum: 1 } } },
      { $sort: { countIds: -1 } }])

      // Use the below code to show the count Ids
      //{$group: {_id:"$_id", name:{$first: "$name"}, countId: {$push:"$countId"}, size: {$sum:1}}},

      .then(function (dbCompanies) {
        // If able to successfully find and associate all companies and counts, send them back to the client
        res.json(dbCompanies);
      })
      .catch(function (err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  },

  getCompaniesAndReports: function(req, res) {
    db.Companies.find({}, null, {sort: {name: 1}})
      .populate("countId")
      .then(function(data) {
        res.json(data)
      })
      .catch(function(err) {
        res.json(err)
      })
  },

  search: function(req, res) {
    db.Companies.findOne({
      name: req.params.company_name,
      address: `${req.params.street_number} ${req.params.route}`,
    }).then(function (searchedCompany) {
      res.json(searchedCompany)
    }).catch(err => res.status(422).json(err))
  },

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
            lat: req.body.lat,
            lng: req.body.lng,
            entry_date: moment().toDate() //new Date()
          })
          .then(function (dbCompanies) {

            // Add count entry in Count database
            db.Counts.create({
              entry_date: moment().toDate() //new Date()
            })
              .then(function (dbCount) {

                // Add Count id to Company id - countId
                db.Companies.update({ _id: dbCompanies.id },
                  { $push: { countId: dbCount.id } })
                  .then(function () {

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
      entry_date: moment().toDate() //new Date()
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
  },

  // Load ALL Companies
  loadAllCompanies: function (req, res) {

    db.Companies.aggregate([
      { $unwind: '$countId' },
      { $group: { _id: '$_id', name: { $first: '$name' }, lat: { $first: '$lat' }, lng: { $first: '$lng' }, countIds: { $sum: 1 } } },
      { $sort: { countIds: -1 } }])

      // Use the below code to show the count Ids
      //{$group: {_id:"$_id", name:{$first: "$name"}, countId: {$push:"$countId"}, size: {$sum:1}}},

      .then(function (dbCompanies) {
        // If able to successfully find and associate all companies and counts, send them back to the client
        res.json(dbCompanies);
      })
      .catch(function (err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  },

  // Load Lifetime Companies
  loadTop10Companies: function (req, res) {

    db.Companies.aggregate([
      { $unwind: '$countId' },
      { $group: { _id: '$_id', name: { $first: '$name' }, state: { $first: '$state' }, city: { $first: '$city' }, address: { $first: '$address' }, countIds: { $sum: 1 } } },
      { $sort: { countIds: -1 } },
      { $limit: 10 }])

      // Use the below code to show the count Ids
      //{$group: {_id:"$_id", name:{$first: "$name"}, countId: {$push:"$countId"}, size: {$sum:1}}},

      .then(function (dbCompanies) {
        // If able to successfully find and associate all companies and counts, send them back to the client
        res.json(dbCompanies);
      })
      .catch(function (err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  },

  // Load Last 30 Days Companies
  last30days: function (req, res) {

    //console.log(moment().subtract(1, 'months').toDate())

    // Get all counts
    db.Counts.aggregate([
      { $match: { entry_date: { $gte: moment().subtract(1, 'months').toDate() } } },
      { $project: { entry_date: 0, __v: 0 } }
    ])
      .then(function (dbCompanies) {
        console.log(dbCompanies)
        var count = []

        dbCompanies.forEach((elemet) => {
          count.push(ObjectId(`${elemet._id}`))
        })

        db.Companies.aggregate([
          { $unwind: '$countId' },
          { $match: { countId: { $in: count } } },
          { $group: { _id: '$_id', name: { $first: '$name' }, state: { $first: '$state' }, city: { $first: '$city' }, address: { $first: '$address' }, countIds: { $sum: 1 } } },
        ])

          .then(function (results) {
            res.json(results);
          })
      })
  },

  // Load Last 7 Days Companies
  last7days: function (req, res) {

    //console.log(moment().subtract(7, 'days').toDate())

    // Get all counts
    db.Counts.aggregate([
      { $match: { entry_date: { $gte: moment().subtract(7, 'days').toDate() } } },
      { $project: { entry_date: 0, __v: 0 } }
    ])
      .then(function (dbCompanies) {

        var count = []

        dbCompanies.forEach((elemet) => {
          count.push(ObjectId(`${elemet._id}`))
        })

        db.Companies.aggregate([
          { $unwind: '$countId' },
          { $match: { countId: { $in: count } } },
          { $group: { _id: '$_id', name: { $first: '$name' }, state: { $first: '$state' }, city: { $first: '$city' }, address: { $first: '$address' }, countIds: { $sum: 1 } } },
        ])

          .then(function (results) {
            res.json(results);
          })
      })
  }
};
