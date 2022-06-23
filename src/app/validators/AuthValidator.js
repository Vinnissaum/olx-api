const { checkSchema } = require('express-validator');

module.exports = {
  signUp: checkSchema({
    name: {
      trim: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: 'Name must be at least 2 characters',
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'This email is invalid',
    },
    password: {
      isLength: {
        options: { min: 2 },
      },
      errorMessage: 'Password must be at least 2 characters',
    },
    state: {
      notEmpty: true,
      errorMessage: 'State must be specified',
    },
  }),
  LogIn: checkSchema({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'This email is invalid',
    },
    password: {
      isLength: {
        options: { min: 2 },
      },
      errorMessage: 'Password must be at least 2 characters',
    },
  }),
};
