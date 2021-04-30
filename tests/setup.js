const mongoose = require('mongoose');
const dbHost = 'mongodb://localhost:27017/bidding-test-db';

beforeAll(async () => {
  await mongoose.connect(dbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  collections.forEach(async (collection) => {
    await collection.deleteMany({});
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
