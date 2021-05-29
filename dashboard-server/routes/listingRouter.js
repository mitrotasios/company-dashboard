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
    const fileRows = [];
    fs.createReadStream(req.file.path)
        .pipe(csv.parse({ headers: true }))
        .on('error', error => next(error))
        .on('data', row => fileRows.push(row))
        .on('end', () => storeRows(fileRows));
    
    
    const storeRows = (fileRows) => {
        fs.unlinkSync(req.file.path);
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