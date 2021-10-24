const { validationCategory } = require('../middleware/validationCategory');
const { Category } = require('../models');

const serviceCreateCategory = async (req, res) => {
    const { name } = req.body;
    validationCategory(res, name);
    const category = await Category.create({ name });
    return category;
};

module.exports = { serviceCreateCategory };