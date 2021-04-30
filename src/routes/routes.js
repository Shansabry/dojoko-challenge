const express = require('express');
const { createAuction } = require('../controllers/createAuction');
const { createBid } = require('../controllers/createBid');
const { validate } = require('../middlewares/validate');
const createAuctionSchema = require('../validationSchema/createAuctionSchema');
const createBidSchema = require('../validationSchema/createBidSchema');

const router = express.Router();

const createAuctionRoute = router.post(
  '/v1/api/auction',
  createAuctionSchema,
  validate,
  createAuction,
);

const createBidRoute = router.post(
  '/v1/api/bid/:auctionId',
  createBidSchema,
  validate,
  createBid,
);

module.exports = { createAuctionRoute, createBidRoute };
