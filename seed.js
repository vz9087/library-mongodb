require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');

const data = [
  { title: 'Introduction to Algorithms', author: 'Cormen', isbn: '9780262033848', category: 'CS', copies: 3 },
  { title: 'Hands-On Machine Learning', author: 'Aurelien Geron', isbn: '9781492032649', category: 'AI/ML', copies: 2 },
  { title: 'Database System Concepts', author: 'Silberschatz', isbn: '9780078022159', category: 'CS', copies: 4 },
  { title: 'Deep Learning', author: 'Goodfellow', isbn: '9780262035613', category: 'AI/ML', copies: 2 }
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/librarydb');
  await Book.deleteMany({});
  for (const b of data) await Book.create(b);
  console.log('Seeded', data.length, 'books');
  process.exit();
})();
