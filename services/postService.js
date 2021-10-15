const { BlogPost, User, Category } = require('../models');
const categoryService = require('./categoryService');

const { 
  validateContent,
  validateTitle,
  validateCategoryId,
 } = require('../middlewares/validationMiddlewares');

const verifyCategories = async (categoryIds) => {
  const categoryExist = Promise.all(categoryIds.map((id) => categoryService.findCategoryById(id)));
  return (await categoryExist)[0];
};

const createPostCategory = async (postId, categoryIds) => {
  const post = await BlogPost.findByPk(postId);

  categoryIds.forEach(async (categoryId) => {
    const categories = await Category.findByPk(categoryId);
    await post.addCategories(categories);
  });
};

const createPost = async ({ title, content, categoryIds }, { id: userId }) => {
  if (validateTitle(title).err) return validateTitle(title);
  if (validateContent(content).err) return validateContent(content);
  if (validateCategoryId(categoryIds).err) return validateCategoryId(categoryIds);

  const verifyCategory = await verifyCategories(categoryIds);
  if (verifyCategory.err) return verifyCategory;

  const { id } = await BlogPost.create({ userId, title, content, categoryIds });
  createPostCategory(id, categoryIds);
  return { id, userId, title, content };
};

const getPosts = async () => {
  const posts = await BlogPost.findAll(
    { 
      include: [ 
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    },
  );
  return posts;
};

const getPostById = async ({ id }) => {
  const post = await BlogPost.findByPk(id,
    { 
      include: [ 
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

  if (post === null) {
    return {
      err: {
        status: 404,
        message: 'Post does not exist',
      },
    };
  }

  return post;
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};