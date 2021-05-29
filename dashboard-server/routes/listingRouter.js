const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const csv = require('fast-csv');
const fs = require('fs');
const multer = require('multer');

const upload = multer({ dest: 'tmp/csv/' });

const Listings = require('../models/listings');
const { worker } = require('cluster');

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
    const LISTINGS = ["id", "make", "price", "mileage", "seller_type"]
    const CONTACTS = ["listing_id", "contact_date"]
    const fileRows = [];
    var format = "";
    fs.createReadStream(req.file.path)
        .pipe(csv.parse({ headers: true }))
        .on('headers', cols => checkCols(cols))
        .on('error', error => next(error))
        .on('data', row => fileRows.push(row))
        .on('end', () => storeRows(fileRows));
    
    const checkCols= (cols) => {
        if (JSON.stringify(cols) === JSON.stringify(LISTINGS)) {
            format = "LISTINGS";
        }
        if (JSON.stringify(cols) === JSON.stringify(CONTACTS)) {
            format = "CONTACTS";
        }
    }

    const storeRows = (fileRows) => {
        fs.unlinkSync(req.file.path);
        
        if (format == "LISTINGS") {
            promises = fileRows.map(row => {
                const filter =  {id: row.id};
                Listings.findOneAndUpdate(filter, {
                    $set: row
                }, { new: true , upsert: true})
                .then((row) => (row))
                .catch((err) => next(err))
            });

            Promise.all(promises).then(() => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({data: fileRows, error: null});
            })
        }
        else if (format == "CONTACTS") {

        }
        else {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json({data: null, error: "Unsupported File Foramt"});
        }
    }
})
.delete((req,res,next) => {
    Listings.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = listingRouter;