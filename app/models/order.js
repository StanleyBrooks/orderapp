const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const orderSchema = new Schema({
  storeLocation: String,
  slug: {
    type: String,
    unique: true
  },
  storeOrder: String
});

// middleware
// make sure that the slug is created from storeLocation
orderSchema.pre('save', function(next) {
  this.slug = slugify(this.storeLocation);
  next();
});

// create the model
const orderModel = mongoose.model('Order', orderSchema);

// function to slugify storeLocation
// this is used instead of id so that only one order can be entered per store
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// export the model
module.exports = orderModel;