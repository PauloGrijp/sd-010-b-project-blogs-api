const PostService = require('../services/PostService');

const {
  categoryIdsValidate,
  contentValidate,
  titleValidate,
} = require('../helpers/postValidations');

module.exports = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const titleValidated = titleValidate(title);
  const contentValidated = contentValidate(content);
  const categoryIdsValidated = categoryIdsValidate(categoryIds);

  if (titleValidated.isError) {
    return res.status(400).json({ message: titleValidated.message });
  }

  if (contentValidated.isError) {
    return res.status(400).json({ message: contentValidated.message });
  }

  if (categoryIdsValidated.isError) {
    return res.status(400).json({ message: categoryIdsValidated.message });
  }

  const isCategoryIdsExists = await PostService.categoryExists(categoryIds);

  if (isCategoryIdsExists.isError) {
    return res.status(400).json({ message: isCategoryIdsExists.message });
  }

  next();
};