const { validationResult, matchedData } = require('express-validator');

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
  }
}

module.exports = new AuthController();
