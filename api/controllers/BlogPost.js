const { StatusCodes } = require('http-status-codes');

const BlogPost = require('../services/BlogPost');

const addNewPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const addedPost = await BlogPost.addNewPost(title, content, categoryIds, req.user);
  if (addedPost.errMsg) {
    return next({ codeErr: addedPost.codeErr, errMsg: addedPost.errMsg });
  }

  res.status(StatusCodes.CREATED).json(addedPost);
};

const getAllPosts = async (req, res, next) => {
  const allPosts = await BlogPost.getAllPosts();
  if (allPosts.errMsg) return next({ errMsg: allPosts.errMsg });

  res.status(StatusCodes.OK).json(allPosts);
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;

  const post = await BlogPost.getPostById(id);
  if (post.errMsg) {
    return next({ codeErr: post.codeErr, errMsg: post.errMsg });
  }

  res.status(StatusCodes.OK).json(post);
};

const editPost = async (req, res, next) => {
  const postId = req.params.id;

  const editedPost = await BlogPost.editPost(req.body, postId, req.user);
  if (editedPost.errMsg) {
    return next({ codeErr: editedPost.codeErr, errMsg: editedPost.errMsg });
  }

  res.status(StatusCodes.OK).json(editedPost);
};

module.exports = {
  addNewPost,
  getAllPosts,
  getPostById,
  editPost,
};
