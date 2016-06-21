'use strict';

var mongoose = require('mongoose'),
  Person = mongoose.model('Person');

exports.create = function (req, res) {
  var person = Person(req.body);
  person.user = req.user;

  person.save(function (err) {
    if (err) {
      return res.status(404).send({
        message: 'Something went wrong'
      });
    } else {
      res.json(person);
    }
  });
};

exports.update = function (req, res) {
  var person = req.person;
  person.full_name = req.body.full_name;
  person.url = req.body.url;
  person.attributes = req.body.attributes;

  person.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: 'Something went wrong'
      });
    } else {
      res.json(person);
    }
  });
};

exports.delete = function (req, res) {
  var person = req.person;

  person.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: 'Something went wrong'
      });
    } else {
      res.json(person);
    }
  });
};

exports.list = function (req, res) {
  Person.find().limit(100).sort('-created').exec(function (err, people) {
    if (err) {
      return res.status(400).send({
        message: 'Something went wrong' 
      });
    } else {
      res.json(people);
    }
  });
};

