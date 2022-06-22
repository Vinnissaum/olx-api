const { validationResult, matchedData } = require('express-validator');
const { isValidObjectId } = require('mongoose');
const User = require('../models/User');
const State = require('../models/State');

class AuthController {
  async logIn() {
    return null;
  }

  async signUp(request, response) {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ error: errors.mapped() });
    }

    const data = matchedData(request);
    response.json({ response: 'Ok', data });

    const user = await User.findOne({
      email: data.email,
    });

    if (user) {
      return response.status(400).json({
        error: { email: { msg: 'Email already in use' } },
      });
    }

    if (isValidObjectId(data.state)) {
      const stateExists = await State.findById(data.state);

      if (!stateExists) {
        return response.status(404).json({ error: 'State not found', data });
      }

      response.json({ response: 'Ok' });
    } else {
      return response.status(400).json({ error: 'Invalid state ID' });
    }
  }
}

module.exports = new AuthController();
