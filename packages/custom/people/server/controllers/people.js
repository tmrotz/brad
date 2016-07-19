'use strict';

var mongoose = require('mongoose'),
  Person = mongoose.model('Person');

/**
 * Create a Person
 */
exports.create = function (req, res) {
  var person = new Person(req.body);
  person.user = req.user;

  person.save(function (err) {
    if (err) {
      return res.status(404).send({
        message: err.message
      });
    } else {
      res.json(person);
    }
  });
};

/**
 * Show the current Person
 */
exports.read = function (req, res) {
  var person = req.person ? req.person.toJSON() : {};
  res.json(person);
};

/**
 * Update a Person
 */
exports.update = function (req, res) {
  var person = req.person;
  person.full_name     = req.body.full_name;
  person.url           = req.body.url;
  person.phone         = req.body.phone;
  person.email         = req.body.email;
  person.job           = req.body.job;
  person.location_safe = req.body.location_safe;
  person.notes         = req.body.notes;
  person.keywords      = req.body.keywords;

  person.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: err.message
      });
    } else {
      res.json(person);
    }
  });
};

/**
 * Delete a Person
 */
exports.delete = function (req, res) {
  var person = req.person;

  person.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: err.message
      });
    } else {
      return res.status(200);
    }
  });
};

/**
 * List of People
 */
exports.list = function (req, res) {
  var one_of_them_exists =
    req.query.full_name || req.query.url ||
    req.query.email || req.query.job ||
    req.query.location_safe || req.query.phone ||
    req.query.notes || req.query.keywords;

  if (!one_of_them_exists) {
    return res.status(400).send({
      message: 'Search for something that isn\'t nothing, or whitespace'
    });
  }

  var search = {}
  if (req.query.full_name) {
    search.full_name = new RegExp(req.query.full_name, 'i');
  }
  if (req.query.url) {
    search.url = new RegExp(req.query.url, 'i');
  }
  if (req.query.email) {
    search.email = new RegExp(req.query.email, 'i');
  }
  if (req.query.job) {
    search.job = new RegExp(req.query.job, 'i');
  }
  if (req.query.location_safe) {
    search.location_safe = new RegExp(req.query.location_safe, 'i');
  }
  if (req.query.phone) {
    search.phone = new RegExp(req.query.phone, 'i');
  }
  if (req.query.notes) {
    search.notes = new RegExp(req.query.notes, 'i');
  }
  if (req.query.keywords) {
    search.keywords = new RegExp(req.query.keywords, 'i');
  }

  Person.find(search).sort('-created').exec(function (err, people) {
    if (err) {
      return res.status(400).send({
        message: err.message
      });
    } else {
      res.json(people);
    }
  });
};

/**
 * Person Middleware
 */
exports.personByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Person is invalid'
    });
  }

  Person.findById(id).exec(function (err, person) {
    if (err) {
      return next(err);
    } else if (!person) {
      return res.status(404).send({
        message: 'No person with that identifier has been found'
      });
    }
    req.person = person;
    next();
  });
};

