const moment = require('moment');
const mongoose = require('mongoose');
const { Auction } = require('../models/auction');
const { Bid } = require('../models/bid');

const computeBiddingStatus = (currentBidder, highestBidder, res) => {
  const highestPrice = highestBidder.price;
  const highestBidderId = highestBidder._id;

  if (
    currentBidder.price === highestPrice &&
    currentBidder._id.toString() !== highestBidderId.toString()
  ) {
    return res.status(200).json({
      result: 'success',
      status: 'draw',
      message: 'Someone has bid with this highest price already',
    });
  } else if (currentBidder.price >= highestPrice) {
    return res.status(200).json({
      result: 'success',
      status: 'high',
      message: 'Hooray!! You are the highest bidder currently',
    });
  } else {
    return res.status(200).json({
      result: 'success',
      status: 'low',
      message: 'Sorry!! You have named a low price for this auction',
    });
  }
};

const createBid = async (req, res) => {
  const { auctionId } = req.params;
  const { name, price } = req.body;
  let auction, bid, biddings;
  try {
    auction = await Auction.findById(auctionId);
  } catch (error) {
    return res.status(500).json({ error: 'Something happened.' });
  }

  if (!auction) {
    return res
      .status(404)
      .json({ error: 'Sorry this auction is not available' });
  } else {
    if (moment().isAfter(auction.endDate)) {
      return res.status(400).json({
        error: `Sorry the ${auction.name} auction has ended`,
      });
    }

    if (price < auction.openingPrice) {
      return res.status(400).json({
        error: `Your bidding price is lesser than starting price for ${auction.name} auction`,
      });
    }

    Bid.create(
      {
        name: name,
        price: price,
        auctionId: auctionId,
        active: true,
      },
      async (error, data) => {
        if (error) {
          return res.status(500).json({ error: 'Something happened.' });
        }

        try {
          biddings = await Bid.find({
            auctionId: data.auctionId,
          }).sort({ price: -1, createdAt: 1 });
          computeBiddingStatus(data, biddings[0], res);
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error: 'Something happened.' });
        }
      },
    );
  }
};

module.exports = { createBid };
