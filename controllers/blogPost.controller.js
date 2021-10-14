const BlogPostService = require('../services/blogPost.service');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const newPost = await BlogPostService.createPost({
    title,
    content,
    categoryIds,
    userId: id,
  });
  return res.status(201).json(newPost);
};
const getAllBlogPost = async (_req, res) => {
  const allBlogPosts = await BlogPostService.getAllBlogPost();
  return res.status(200).json(allBlogPosts);
};

const getBlogPostById = async (req, res) => {
  const { id } = req.params;
  const blogPost = await BlogPostService.getBlogPostById(id);
  if (!blogPost) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(blogPost);
};

module.exports = { createPost, getAllBlogPost, getBlogPostById };