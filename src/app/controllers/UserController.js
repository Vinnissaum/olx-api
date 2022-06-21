const State = require('../models/State');

class UserController {
  async getStates(request, response) {
    const states = await State.find();
    response.json({ states });
  }

  async info() {
    return null;
  }

  async update() {
    return null;
  }
}

module.exports = new UserController();
