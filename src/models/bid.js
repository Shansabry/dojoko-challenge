const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    auctionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    active: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

const Bid = mongoose.model('bid', bidSchema);

module.exports = { Bid };
