const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const csv = require('fast-csv');
const fs = require('fs');
const multer = require('multer');
const Pool = require('pg').Pool
const dbKeys = require('../config');

const pool = new Pool(dbKeys)

const upload = multer({ dest: 'tmp/csv/' });

const Listings = require('../models/listings');
const { worker } = require('cluster');

const listingRouter = express.Router();

listingRouter.use(bodyParser.json());

listingRouter.route('/')
.get((req, res, next) => {
    pool.query('SELECT * FROM listings;', (error, results) => {
        if (error) {
            next(error)
        }
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(results.rows);
    })
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
        var isError = false;
        if (format == "LISTINGS") {
            fs.unlinkSync(req.file.path);
            var promises = fileRows.splice(0, 5).map(row => {
                const { id, make, price, mileage, seller_type } = row;
                return new Promise((resolve, reject) => {
                    pool.query('INSERT INTO listings (id, make, price, mileage, seller_type) \
                        VALUES ($1, $2, $3, $4, $5)', [Number(id), String(make), Number(price), Number(mileage), seller_type],
                        (error, results) => {
                            if (error!==undefined) {
                                console.log(error)
                                isError = true;
                                resolve();
                            }
                            else {
                                resolve();
                            }
                        })   
                })
            });
            Promise.all(promises).then(() => {
                if (isError) {
                    res.status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ data: null, error: "CSV format or data invalid." });
                }
                else {
                    res.status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ data: true, error: null });
                }
            })
        }
        else if (format == "CONTACTS") {
            fs.unlinkSync(req.file.path);
            var promises = fileRows.splice(0, 5).map(row => {
                const { listing_id, contact_date } = row;
                return new Promise((resolve, reject) => {
                    pool.query('INSERT INTO contacts (listing_id, contact_date) \
                                VALUES ($1, $2)', [Number(listing_id), new Date(Number(contact_date))],
                        (error, results) => {
                            if (error!==undefined) {
                                console.log(error)
                                isError = true;
                                resolve();
                            }
                            else {
                                resolve();
                            }
                        })   
                })
            });
            Promise.all(promises).then(() => {
                if (isError) {
                    res.status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ data: null, error: "CSV format or data invalid." });
                }
                else {
                    res.status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ data: true, error: null });
                }
            })
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({data: null, error: "Unsupported File Foramt"});
        }
    }
})
.delete((req,res,next) => {
    pool.query('DELETE FROM listings', (error, results) => {
        if (error) {
            next(error)
        }
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(results.rows);
    })
});

module.exports = listingRouter;