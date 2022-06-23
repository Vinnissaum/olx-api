const { checkSchema } = require('express-validator');

module.exports = {
  update: checkSchema({
    token: {
      notEmpty: true,
    },
    name: {
      optional: true,
      trim: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: 'Name must be at least 2 characters',
    },
    email: {
      optional: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'This email is invalid',
    },
    password: {
      optional: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: 'Password must be at least 2 characters',
    },
    state: {
      optional: true,
      notEmpty: true,
      errorMessage: 'State must be specified',
    },
  }),
};
