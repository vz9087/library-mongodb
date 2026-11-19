const router = require('express').Router();
const Book = require('../models/Book');

// Create
router.post('/', async (req, res) => {
  try { res.status(201).json(await Book.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

// Read all (with optional ?search= and ?category=)
router.get('/', async (req, res) => {
  const { search, category } = req.query;
  const q = {};
  if (search) q.$text = { $search: search };
  if (category) q.category = category;
  res.json(await Book.find(q).sort({ createdAt: -1 }));
});

// Stats using aggregation
router.get('/stats', async (req, res) => {
  const [totals] = await Book.aggregate([
    { $group: { _id: null, titles: { $sum: 1 }, copies: { $sum: '$copies' }, available: { $sum: '$available' } } }
  ]);
  const byCategory = await Book.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  res.json({ totals: totals || { titles: 0, copies: 0, available: 0 }, byCategory });
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    book ? res.json(book) : res.status(404).json({ error: 'Not found' });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// Delete
router.delete('/:id', async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  book ? res.json({ message: 'Deleted' }) : res.status(404).json({ error: 'Not found' });
});

// Issue a book
router.post('/:id/issue', async (req, res) => {
  const { member } = req.body;
  if (!member) return res.status(400).json({ error: 'Member name required' });
  const book = await Book.findOneAndUpdate(
    { _id: req.params.id, available: { $gt: 0 } },
    { $inc: { available: -1 }, $push: { issues: { member } } },
    { new: true }
  );
  book ? res.json(book) : res.status(400).json({ error: 'No copies available' });
});

// Return a book
router.post('/:id/return', async (req, res) => {
  const { member } = req.body;
  const book = await Book.findOneAndUpdate(
    { _id: req.params.id, 'issues.member': member },
    { $inc: { available: 1 }, $pull: { issues: { member } } },
    { new: true }
  );
  book ? res.json(book) : res.status(400).json({ error: 'No such issue record' });
});

module.exports = router;
