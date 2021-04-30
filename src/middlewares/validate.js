const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    return res.status(400).send(
      results.errors.map((err) => {
        return { message: err.msg, field: err.param };
      }),
    );
  }
  next();
};

module.exports = { validate };
