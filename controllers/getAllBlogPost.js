 const { BlogPost, User, Category } = require('../models');
  
  const getAllBlogPost = async (_req, res) => {
  try {
    const getAllUsers = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });   
    return res.status(200).json(getAllUsers);
  } catch (error) {
   return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllBlogPost,
};