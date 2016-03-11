// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var cartSchema = new Schema({
  title:String,
  price:Number,
  url:String,
  quantity:{type: Number, default: 0}
}, {
  versionKey: false // You should be aware of the outcome after set to false
});
// the schema is useless so far
// we need to create a model using it
var Cart = mongoose.model('cart', cartSchema);

// make this available to our users in our Node applications
module.exports = Cart;
