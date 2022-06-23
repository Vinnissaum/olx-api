const { validationResult, matchedData } = require('express-validator');
const { isValidObjectId } = require('mongoose');
const bcrypt = require('bcrypt');
const State = require('../models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');

class UserController {
  async getStates(request, response) {
    const states = await State.find();
    response.json({ states });
  }

  async info(request, response) {
    const { token } = request.query;

    const user = await User.findOne({ token });
    const state = await State.findById(user.state);
    const ads = await Ad.find({ idUser: user._id.toString });

    const adList = [];
    Object.keys(ads).forEach(async (key) => {
      const categoryType = await Category.findById(adList[key].category);

      adList.push({ ...ads[key], category: categoryType.slug });
    });

    response.json({
      name: user.name,
      email: user.email,
      state: state.name,
      ads: adList,
    });
  }

  async update(request, response) {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ error: errors.mapped() });
    }

    const data = matchedData(request);
    const updates = {};

    if (data.name) {
      updates.name = data.name;
    }

    if (data.email) {
      const emailExists = await User.findOne({ email: data.email });

      if (emailExists) {
        return response.status(400).json({ error: 'Email is already in use' });
      }
      updates.email = data.email;
    }

    if (data.state) {
      if (isValidObjectId(data.state)) {
        const stateExists = await User.findById(data.state);

        if (!stateExists) {
          return response.status(400).json({ error: 'State does not exist' });
        }
        updates.state = data.state;
      } else {
        return response.status(404).json({ error: 'Invalid state ID' });
      }
    }

    if (data.password) {
      updates.passwordHash = await bcrypt.hash(data.password, 10);
    }

    await User.findOneAndUpdate({ token: data.token }, { $set: updates });

    response.sendStatus(200);
  }
}

module.exports = new UserController();
