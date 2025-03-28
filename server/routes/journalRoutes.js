
const express = require('express');
const router = express.Router();
const { db } = require('../index');

// Get all journal entries
router.get('/', async (req, res) => {
  try {
    const entries = await db.all('SELECT * FROM journal_entries ORDER BY date DESC');
    res.json(entries);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
});

// Get a single journal entry
router.get('/:id', async (req, res) => {
  try {
    const entry = await db.get('SELECT * FROM journal_entries WHERE id = ?', req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.json(entry);
  } catch (error) {
    console.error('Error fetching journal entry:', error);
    res.status(500).json({ error: 'Failed to fetch journal entry' });
  }
});

// Create a new journal entry
router.post('/', async (req, res) => {
  const { title, description, date, category, imageUrl } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  
  try {
    const result = await db.run(
      'INSERT INTO journal_entries (title, description, date, category, imageUrl) VALUES (?, ?, ?, ?, ?)',
      [title, description, date || new Date().toISOString().split('T')[0], category || '', imageUrl || '']
    );
    
    const newEntry = await db.get('SELECT * FROM journal_entries WHERE id = ?', result.lastID);
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error creating journal entry:', error);
    res.status(500).json({ error: 'Failed to create journal entry' });
  }
});

// Update a journal entry
router.put('/:id', async (req, res) => {
  const { title, description, date, category, imageUrl } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  
  try {
    await db.run(
      'UPDATE journal_entries SET title = ?, description = ?, date = ?, category = ?, imageUrl = ? WHERE id = ?',
      [title, description, date, category, imageUrl, req.params.id]
    );
    
    const updatedEntry = await db.get('SELECT * FROM journal_entries WHERE id = ?', req.params.id);
    if (!updatedEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    
    res.json(updatedEntry);
  } catch (error) {
    console.error('Error updating journal entry:', error);
    res.status(500).json({ error: 'Failed to update journal entry' });
  }
});

// Delete a journal entry
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.run('DELETE FROM journal_entries WHERE id = ?', req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    
    res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    res.status(500).json({ error: 'Failed to delete journal entry' });
  }
});

module.exports = router;
