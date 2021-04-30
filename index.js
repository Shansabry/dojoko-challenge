const mongoose = require('mongoose');

const { app } = require('./app.js');

const start = async () => {
  const port = 8000;
  try {
    await mongoose.connect(`mongodb://localhost:27017/bidding-db`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log(err);
  }

  app.listen(port, () => {
    console.log(`Listening on port ${port}!!!!`);
  });
};

start();
