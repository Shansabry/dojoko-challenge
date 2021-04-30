const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    openingPrice: { type: Number, required: true },
    active: { type: Boolean },
  },
  { timestamps: true },
);

const Auction = mongoose.model('auction', auctionSchema);

module.exports = { Auction };
