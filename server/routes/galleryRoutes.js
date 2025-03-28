
const express = require('express');
const router = express.Router();
const { db } = require('../index');

// Get all photos
router.get('/', async (req, res) => {
  try {
    const photos = await db.all('SELECT * FROM gallery_photos ORDER BY date DESC');
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

// Get photos by category
router.get('/category/:category', async (req, res) => {
  try {
    const photos = await db.all(
      'SELECT * FROM gallery_photos WHERE category = ? ORDER BY date DESC',
      req.params.category
    );
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos by category:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

// Get a single photo
router.get('/:id', async (req, res) => {
  try {
    const photo = await db.get('SELECT * FROM gallery_photos WHERE id = ?', req.params.id);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.json(photo);
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(500).json({ error: 'Failed to fetch photo' });
  }
});

// Create a new photo
router.post('/', async (req, res) => {
  const { url, title, date, category } = req.body;
  
  if (!url || !title) {
    return res.status(400).json({ error: 'URL and title are required' });
  }
  
  try {
    const result = await db.run(
      'INSERT INTO gallery_photos (url, title, date, category) VALUES (?, ?, ?, ?)',
      [url, title, date || new Date().toISOString().split('T')[0], category || '']
    );
    
    const newPhoto = await db.get('SELECT * FROM gallery_photos WHERE id = ?', result.lastID);
    res.status(201).json(newPhoto);
  } catch (error) {
    console.error('Error creating photo:', error);
    res.status(500).json({ error: 'Failed to create photo' });
  }
});

// Update a photo
router.put('/:id', async (req, res) => {
  const { url, title, date, category } = req.body;
  
  if (!url || !title) {
    return res.status(400).json({ error: 'URL and title are required' });
  }
  
  try {
    await db.run(
      'UPDATE gallery_photos SET url = ?, title = ?, date = ?, category = ? WHERE id = ?',
      [url, title, date, category, req.params.id]
    );
    
    const updatedPhoto = await db.get('SELECT * FROM gallery_photos WHERE id = ?', req.params.id);
    if (!updatedPhoto) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    
    res.json(updatedPhoto);
  } catch (error) {
    console.error('Error updating photo:', error);
    res.status(500).json({ error: 'Failed to update photo' });
  }
});

// Delete a photo
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.run('DELETE FROM gallery_photos WHERE id = ?', req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
});

module.exports = router;
