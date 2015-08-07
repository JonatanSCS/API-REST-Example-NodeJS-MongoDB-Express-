var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Images = new Schema({
    kind: {
      type: String,
      enum: ['thumbnail', 'detail'],
      required: true
    },
    url: { type: String, required: true }
  });
var Book = new Schema({
  name:    { type: String, require: true },
  author:   { type: String, require: false },
  editorial:    { type: String,
              require: true
            },
  edition:     { type: String,
              require: true
            },
  country:   { type: String, require: true },
  price :   { type: String, require: true },
  pages:  { type: String, require: true },
  modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', Book);