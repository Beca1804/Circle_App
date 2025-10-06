import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    await dbConnect();
    const posts = await Post.find().populate('userId', 'username email');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
