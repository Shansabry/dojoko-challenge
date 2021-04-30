const moment = require('moment');
const { Auction } = require('../models/auction');

const createAuction = async (req, res) => {
  const { name, startDate, endDate, openingPrice } = req.body;
  const formattedEndDate = moment.utc(endDate).endOf('day');

  if (moment(formattedEndDate).isBefore(startDate)) {
    return res.status(400).json({
      error:
        'The endDate is before startDate. Please provide date greater than startdate.',
    });
  }

  if (moment().isAfter(formattedEndDate)) {
    return res.status(400).json({
      error:
        'You are past the enddate already.Please change the end date to future date.',
    });
  }

  const auction = new Auction({
    name: name,
    startDate: startDate,
    endDate: formattedEndDate,
    openingPrice: openingPrice,
    active: true,
  });
  try {
    const data = await auction.save();
    return res.status(201).json({ id: data._id, error: null });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something happened.' });
  }
};

module.exports = { createAuction };
