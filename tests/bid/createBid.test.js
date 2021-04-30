const request = require('supertest');

const { app } = require('../../app');

it('returns status:low for a low bid price', async () => {
  const { body } = await request(app)
    .post('/v1/api/auction')
    .send({
      name: 'Headphones',
      openingPrice: '12.99',
      startDate: '2021-04-29',
      endDate: '2021-05-30',
    })
    .expect(201);
  const { id: auctionId } = body;

  await request(app)
    .post(`/v1/api/bid/${auctionId}`)
    .send({ name: 'Manish', price: 14 });

  await request(app)
    .post(`/v1/api/bid/${auctionId}`)
    .send({ name: 'Sunil', price: 17 });

  const response = await request(app)
    .post(`/v1/api/bid/${auctionId}`)
    .send({ name: 'Rohit', price: 15 });
  expect(response.body.status).toEqual('low');
});

it('returns status:high for a high bid price', async () => {
  const { body } = await request(app)
    .post('/v1/api/auction')
    .send({
      name: 'Headphones',
      openingPrice: '12.99',
      startDate: '2021-04-29',
      endDate: '2021-05-30',
    })
    .expect(201);
  const { id: auctionId } = body;

  await request(app)
    .post(`/v1/api/bid/${auctionId}`)
    .send({ name: 'Manish', price: 17 });

  await request(app)
    .post(`/v1/api/bid/${auctionId}`)
    .send({ name: 'Sunil', price: 13 });

  const response = await request(app)
    .post(`/v1/api/bid/${auctionId}`)
    .send({ name: 'Rohit', price: 235 });
  expect(response.body.status).toEqual('high');
});

it('returns status:draw for submitting the existing high price', async () => {
  const { body } = await request(app)
    .post('/v1/api/auction')
    .send({
      name: 'Headphones',
      openingPrice: '12.99',
      startDate: '2021-04-29',
      endDate: '2021-05-30',
    })
    .expect(201);
  const { id: auctionId } = body;

  await request(app)
    .post(`/v1/api/bid/${auctionId}`)
    .send({ name: 'Manish', price: 17 });

  await request(app)
    .post(`/v1/api/bid/${auctionId}`)
    .send({ name: 'Sunil', price: 13 });

  const response = await request(app)
    .post(`/v1/api/bid/${auctionId}`)
    .send({ name: 'Rohit', price: 17 });
  expect(response.body.status).toEqual('draw');
});

it('returns 400 error if invalid request payload is send', async () => {
  await request(app)
    .post(`/v1/api/bid/608bd6e1b948117266cc5bc9`)
    .send({ price: 't' })
    .expect(400);
});

it('returns 400 error if invalid id is passed in url', async () => {
  await request(app).post(`/v1/api/bid/test`).send({ price: '22' }).expect(400);
});

it('returns 404 error if non exisiting auction id is given', async () => {
  await request(app)
    .post(`/v1/api/bid/608bd6e1b948117266cc5bc9`)
    .send({ name: 'Dan', price: '22' })
    .expect(404);
});
