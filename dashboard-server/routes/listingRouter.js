const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const csv = require('fast-csv');
const fs = require('fs');
const multer = require('multer');

const upload = multer({ dest: 'tmp/csv/' });

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
.post(upload.single('file'), (req, res, next) => {
    const fileRows = [];
    csv.fromPath(req.file.path)
        .on("data", function (data) {
            fileRows.push(data); // push each row
        })
        .on("end", function () {
            console.log(fileRows) //contains array of arrays. Each inner array represents row of the csv file, with each element of it a column
            fs.unlinkSync(req.file.path);   // remove temp file
            //process "fileRows" and respond
        })
})

module.exports = listingRouter;