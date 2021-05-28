const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    listing_id: {
        type: String,
        required: true,
        unique: true
    },
    make: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    mileage: {
        type: Number,
        required: true,
    },
    seller_type: {
        type: String,
        required: true,
    },
    contacts: [Date]
}, {
    timestamps: true
});

var Listings = mongoose.model('Listing', listingSchema);

module.exports = Listings;