const request = require('supertest');

const { app } = require('../../app');

it('returns id if the auction is created successfully', async () => {
  const response = await request(app).post('/v1/api/auction').send({
    name: 'Headphones',
    openingPrice: '12.99',
    startDate: '2021-04-29',
    endDate: '2021-05-30',
  });
  expect(response.body.id).toBeDefined();
});

it('returns 400 if the end date is before start date', async () => {
  await request(app)
    .post('/v1/api/auction')
    .send({
      name: 'Headphones',
      openingPrice: '12.99',
      startDate: '2021-04-29',
      endDate: '2021-04-28',
    })
    .expect(400);
});

it('returns 400 if the end date is before current date', async () => {
  await request(app)
    .post('/v1/api/auction')
    .send({
      name: 'Headphones',
      openingPrice: '12.99',
      startDate: '2021-04-24',
      endDate: '2021-04-28',
    })
    .expect(400);
});

it('returns 400 if invalid request payload is send', async () => {
  await request(app)
    .post('/v1/api/auction')
    .send({
      name: 'Headphones',
      openingPrice: 'tttt',
    })
    .expect(400);
});
