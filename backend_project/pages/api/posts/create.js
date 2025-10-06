import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    await dbConnect();
    const { title, content, userId } = req.body;
    const post = await Post.create({ title, content, userId });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
