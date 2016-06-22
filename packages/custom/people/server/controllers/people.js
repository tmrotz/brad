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
  person.full_name = req.body.full_name;
  person.url = req.body.url;
  person.moo = req.body.moo;

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
      res.json(person);
    }
  });
};

/**
 * List of People
 */
exports.list = function (req, res) {
  Person.find().limit(100).sort('-created').exec(function (err, people) {
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

