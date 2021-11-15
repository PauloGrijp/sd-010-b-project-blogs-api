const express = require('express');
const { User, Category, BlogPost, PostsCategory } = require('../models');
const PostService = require('../services/PostService');
const validateJWT = require('../middlewares/token/validateJWT');
const postValidate = require('../middlewares/postValidate');
const updatePostValidate = require('../middlewares/updatePostValidate');

const BlogPostRouter = express.Router();

BlogPostRouter.post('/', validateJWT, postValidate, async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { user } = req;
  
    const post = await BlogPost.create({ userId: user.id, title, content });
    
    const { id } = post;
  
    await categoryIds.forEach(async (categoryId) => {
      const postId = id;
      await PostsCategory.create({ categoryId, postId });
    });
  
    const { published, updated, ...postWithoutTimes } = post.dataValues;
  
    return res.status(201).json(postWithoutTimes);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

BlogPostRouter.get('/', validateJWT, async (_req, res) => {
  try {
    const posts = await BlogPost.findAll({ 
      include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    });
  
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

BlogPostRouter.get('/:id', validateJWT, async (req, res) => {
  try {
    const { id } = req.params;

    const isPostExists = await PostService.postExists(id);

    if (isPostExists.isError) {
      return res.status(404).json({ message: isPostExists.message });
    }
    
    const post = await BlogPost.findByPk(id, { 
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

BlogPostRouter.put('/:id', validateJWT, updatePostValidate, async (req, res) => {
  const { id } = req.params;
  const { post } = req;
  const { title, content } = req.body;
  
  const [updatePost] = await BlogPost.update({ title, content }, { where: { id } });
 
  if (!updatePost) return res.status(200).json({ message: 'Post does not exist' });

  const newPost = {
    title,
    content,
    userId: post.userId,
    categories: post.categories,
  };
  return res.status(200).json(newPost);
});

module.exports = BlogPostRouter;