var express = require("express");
var path = require('path');
var mongoose = require('mongoose');
var Product = require('./Schemas/products');
var Cart = require('./Schemas/cart');
var bodyParser = require('body-parser');
var app = express();

app.disable('x-powered-by');

mongoose.connect('mongodb://localhost/products');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/cart', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/cart.html'))
});

app.get('/order', function(req, res) {
    mongoose.connection.db.dropCollection('carts', function(err, result) {
        console.log("Cart droped");
    })
    res.sendFile(path.join(__dirname, 'public/order.html'))
});

app.get('/data', function(req, res) {
    Product.find({}, function(err, products) {
        if (err) throw err;

        res.json(products);
    });
});

app.get('/cartdb', function(req, res) {
    Cart.find({}, function(err, items) {
        if (err) throw err;

        res.json(items);
    });
});

app.post('/addtocart', function(req, res) {

    var cart = Cart({
        title: req.body.title,
        price: req.body.price,
        url: req.body.url,
        quantity: 1
    });

    Cart.find({
        title: cart.title
    }, function(err, docs) {
        if (docs.length) {
            Cart.findOneAndUpdate({
                quantity: docs[0].quantity
            }, {
                $inc: {
                    quantity: 1
                }
            }, function(err, product) {
                if (err) throw err;
            });
        } else {
            cart.save(function(err) {
                if (err) throw err;

                console.log('Product successfully created!');
                res.end();
            });
        }
    });

});

app.put('/update/:_id', function(req, res) {
    quantity = req.body.quantity;
    _id = req.params._id;
    Cart.findByIdAndUpdate(_id, {
        quantity: quantity
    }, function(err, product) {
        if (err) throw err;
        res.end();
    });
});

app.delete('/delete/:_id', function(req, res) {
    Cart.remove({
        _id: req.params._id
    }, function(err, item) {
        if (err)
            res.send(err);
        res.end();
    });
});

app.use(function(req, res, next) {
    console.log("Looking for URL: " + req.url);
    next();
});

// 404 response
app.use(function(req, res) {
    res.type('text/html');
    res.status(404);
    res.sendFile(path.join(__dirname, 'public/404.html'));
});

// 500 response
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.sendFile(path.join(__dirname, 'public/500.html'));
});

app.listen(3000, function() {
    console.log("Server started on port 3000 press Ctrl-c to terminate");
});
