const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Listings = require('../models/listings');

const listingRouter = express.Router();

listingRouter.use(bodyParser.json());

listingRouter.route('/')
.get((req, res, next) => {
    Listings.find({})
    .then((listings) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(listings)
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = listingRouter;