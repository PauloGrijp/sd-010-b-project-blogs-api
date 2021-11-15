const PostService = require('../services/PostService');

const {
  contentValidate,
  titleValidate,
  categoryIdsNotEdited,
} = require('../helpers/postValidations');

module.exports = async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;

  const titleValidated = titleValidate(title);
  const contentValidated = contentValidate(content);
  const categoryIdValidate = categoryIdsNotEdited(categoryIds);
  
  if (titleValidated.isError) return res.status(400).json({ message: titleValidated.message });
  if (contentValidated.isError) return res.status(400).json({ message: contentValidated.message });
  if (categoryIdValidate.isError) {
    return res.status(400).json({ message: categoryIdValidate.message });
  }
  
  const post = await PostService.updatePost(id, user.id);
  if (post.isError) return res.status(401).json({ message: post.message });
  
  req.post = post;
  
  next();
};