'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Person Schema
 */
var PersonSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  full_name: {
    type: String,
    default: '',
    trim: true,
    required: 'Full name cannot be blank'
  },
  url: {
    type: String,
    default: '',
    trim: true,
    required: 'Url cannot be blank'
  },
  attributes: [String],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Person', PersonSchema);

