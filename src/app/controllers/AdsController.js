const Category = require('../models/Category');

class AdsController {
  async index() {
    return null;
  }

  async show() {
    return null;
  }

  async create() {
    return null;
  }

  async update() {
    return null;
  }

  async getCategories(request, response) {
    const getCategories = await Category.find();

    const categories = getCategories.map((category) => (
      {
        ...category._doc,
        img: `${process.env.BASE}/assets/images/${category.slug}.png`,
      }
    ));

    response.json({ categories });
  }
}

module.exports = new AdsController();
