const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ Falta MONGODB_URI en .env');
  process.exit(1);
}
connectDB(uri);

// Rutas
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.get('/', (_req, res) => {
  res.json({ ok: true, message: 'Circle Backend OK' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en puerto ${PORT}`));
