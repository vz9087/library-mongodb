require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/books', require('./routes/books'));

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/librarydb')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
  })
  .catch(err => { console.error('DB connection failed:', err.message); process.exit(1); });
