const express = require('express');
const { json } = require('body-parser');
const { createAuctionRoute, createBidRoute } = require('./src/routes/routes');

const app = express();
app.set('trust proxy', true);

app.use(json());

app.use(createAuctionRoute);
app.use(createBidRoute);

module.exports = { app };
