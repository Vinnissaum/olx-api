const User = require('../app/models/User');

exports.private = async (request, response, next) => {
  const token = request.query.token || request.body.token;

  if (token) {
    const user = await User.findOne({ token });
    if (user) return next();
  }

  request.json({ Access: 'Permission denied' });
};
