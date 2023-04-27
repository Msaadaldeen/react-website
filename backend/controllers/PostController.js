import Post from '../models/Post.js';
import User from '../models/User.js';

export const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can update only your Posts!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json('Post has been deleted...');
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can delete only your Posts!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const readPosts = async (req, res) => {
  const username = req.query.username;
  try {
    let posts;

    posts = await Post.find()
      .populate({ path: 'postedBy', select: ['firstname', 'lastname', 'username', 'email'] })
      .exec();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const readPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({ path: 'postedBy', select: ['firstname', 'lastname', 'username', 'email'] })
      .exec();
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export default {
  createPost,
  updatePost,
  deletePost,
  readPosts,
  readPost,
};
