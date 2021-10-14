const postServices = require('../services/postService');

const createPost = async (req, res) => {
const result = await postServices.createPost(req.body);
return res.status(201).json(result);
};

module.exports = {
  createPost,
};