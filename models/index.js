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

  // Load Lifetime Companies
  loadLifetime: function (req, res) {

    db.Companies.aggregate([
      { $unwind: '$countId' },
      { $group: { _id: '$_id', name: { $first: '$name' }, countIds: { $sum: 1 } } },
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

    // db.Companies.aggregate([
    //   { $unwind: "$countId" },
    //   { $group: { _id: "$_id", name: { $first: "$name" }, countId: { $push: "$countId" }, size: { $sum: 1 } } }
    // ])
    //   .then(function (dbCompanies) {
    //     console.log(dbCompanies)

    //     db.Companies.populate(
    //       dbCompanies,
    //       {
    //         path: 'countId',
    //         match: { 'entry_date': { $gt: moment().toDate() } }
    //       },
    //       function (err, populatedTransactions) {
    //         res.json(populatedTransactions);
    //       });
    //   })


    // db.Companies.aggregate([
    //   { $unwind: '$countId' },
    //   //{ $match: { 'entry_date': { $gte: moment().toDate() } } },
    //   { $group: { _id: "$_id", name: { $first: "$name" }, countId: { $push: "$countId" }, size: { $sum: 1 } } },
    //   //{ $project: { countId: 1, name: '$name', _id: 0 } }
    // ])
    //   .then(function (err, transactions) {

    //     console.log("transactions", transactions)

    //     db.Companies.populate(
    //       transactions,
    //       {
    //         path: 'countId',
    //         match: { 'entry_date': { $lt: moment().toDate() } }
    //       },
    //       function (err, populatedTransactions) {
    //         res.json(populatedTransactions);
    //       });
    //   });

    // Find all Companies
    db.Counts.aggregate([
      { $match: { entry_date: { $gt: moment().toDate() } } },
      { $project: { entry_date: 0, __v: 0 } }
    ])
      .then(function (dbCompanies) {

        //console.log("dbCompanies", dbCompanies)

        db.Companies.find({ 'countId': { $in: dbCompanies }})
          .then(function (test) {
            res.json(test);
          })
      })


    // db.Counts.find({
    //   entry_date: { $gt: moment().toDate() }
    // })
    //   .then(function (transactions) {

    //     console.log("transactions", transactions)

    //     db.Companies.aggregate([
    //       { $unwind: '$countId' },
    //       { $match: { entry_date: { $eq: transactions } } },
    //       { $group: { _id: "$_id", name: { $first: "$name" }, countId: { $push: "$countId" }, size: { $sum: 1 } } },
    //       //{ $project: { countId: 1, name: '$name', _id: 0 } }
    //     ])

    //     // db.Companies.find({ countId: { $eq: transactions.entry_date }
    //     // })
    //      .then(function (dbCompanies) {

    //        console.log("dbCompanies", dbCompanies)
    //      })
    // .catch(function (err) {
    //   // If an error occurs, send it back to the client
    //   res.json(err);
    // })
    // transactions,
    // {
    //   path: 'countId',
    //   select: 'name',
    //   match: { entry_date: { $eq: transactions.entry_date }}
    // },
    // function (err, pop) {
    //   res.json(pop);
    // })
    //})

    // Specify that we want to populate the retrieved companies with any associated counts
    // .populate({
    //   path: 'Companies',
    //   match: { entry_date: { $gt: moment().toDate() } },
    // })

    // //.populate('Companies', null, {entry_date: { $gt: moment().toDate() } })

    // .then(function (dbCompanies) {

    // res.json(dbCompanies);
    //})


    // // Find all Companies
    // db.Counts.find({entry_date: { $gt: moment().toDate() }})


    //     // Specify that we want to populate the retrieved companies with any associated counts
    //     // .populate({
    //     //   path: 'Companies',
    //     //   match: { entry_date: { $gt: moment().toDate() } },
    //     // })

    //     // //.populate('Companies', null, {entry_date: { $gt: moment().toDate() } })

    //     .then(function (dbCompanies) {

    //       res.json(dbCompanies);
    //     })
    //     .catch(function (err) {
    //       // If an error occurs, send it back to the client
    //       res.json(err);
    //     });
  }
};
