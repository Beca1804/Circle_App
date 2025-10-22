const Post = require('../models/Post');

async function createPost(req, res) {
  try {
    const { userId, content } = req.body;
    const post = await Post.create({ userId, content });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function listPosts(_req, res) {
  try {
    const posts = await Post.find().populate('userId', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createPost, listPosts };
