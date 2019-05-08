const express = require('express');
const router = express.Router();

const addToCart = require('../api/addToCart');
const getFromCart = require('../api/getCart');



//addtocart route
router.post('/addtocart', (req, res) => {
    console.log(req.body)
    var AddToCart = new addToCart(req.body, req.headers);
    AddToCart.add()
        .then(result => {
            res.send(result)
        })
})

//cart route
router.post('/cart', (req, res) => {
    console.log(req.body)
    var getfromcart = new getFromCart(req.body, req.headers);
    getfromcart.get()
        .then(result => {
            res.send(result)
        })
})

module.exports = router;