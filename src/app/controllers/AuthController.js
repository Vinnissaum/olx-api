const { validationResult, matchedData } = require('express-validator');
const { isValidObjectId } = require('mongoose');
const bcrypt = require('bcrypt');
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

    const userExists = await User.findOne({
      email: data.email,
    });

    if (userExists) {
      return response.status(400).json({
        error: { email: { msg: 'Email already in use' } },
      });
    }

    if (!isValidObjectId(data.state)) {
      return response.status(400).json({ error: 'Invalid state ID' });
    }

    const stateExists = await State.findById(data.state);

    if (!stateExists) {
      return response.status(404).json({ error: 'State not found', data });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = new User({
      name: data.name,
      email: data.email,
      passwordHash,
      token,
      state: data.state,
    });

    await newUser.save();

    response.json({ token });
  }
}

module.exports = new AuthController();
