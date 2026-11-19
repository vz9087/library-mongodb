const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title:     { type: String, required: true, trim: true },
  author:    { type: String, required: true, trim: true },
  isbn:      { type: String, required: true, unique: true },
  category:  { type: String, default: 'General' },
  copies:    { type: Number, required: true, min: 1 },
  available: { type: Number, min: 0 },
  issues: [{
    member:   String,
    issuedOn: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text' });

bookSchema.pre('save', function (next) {
  if (this.isNew && this.available === undefined) this.available = this.copies;
  next();
});

module.exports = mongoose.model('Book', bookSchema);
