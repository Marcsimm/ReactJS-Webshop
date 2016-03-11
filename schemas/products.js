// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
  title:String,
  price:Number,
  url:String,
  quantity:Number
});

// the schema is useless so far
// we need to create a model using it
var Product = mongoose.model('products', productSchema);

// make this available to our users in our Node applications
module.exports = Product;
