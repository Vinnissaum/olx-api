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

  async update() {
    return null;
  }
}

module.exports = new UserController();
