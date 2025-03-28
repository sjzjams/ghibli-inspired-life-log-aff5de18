
const express = require('express');
const router = express.Router();
const { db } = require('../index');

// Get all milestones
router.get('/', async (req, res) => {
  try {
    const milestones = await db.all('SELECT * FROM milestones ORDER BY date DESC');
    res.json(milestones);
  } catch (error) {
    console.error('Error fetching milestones:', error);
    res.status(500).json({ error: 'Failed to fetch milestones' });
  }
});

// Get a single milestone
router.get('/:id', async (req, res) => {
  try {
    const milestone = await db.get('SELECT * FROM milestones WHERE id = ?', req.params.id);
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    res.json(milestone);
  } catch (error) {
    console.error('Error fetching milestone:', error);
    res.status(500).json({ error: 'Failed to fetch milestone' });
  }
});

// Create a new milestone
router.post('/', async (req, res) => {
  const { title, date, description, importance } = req.body;
  
  if (!title || !date || !description) {
    return res.status(400).json({ error: 'Title, date, and description are required' });
  }
  
  try {
    const validImportance = importance === 'major' ? 'major' : 'normal';
    
    const result = await db.run(
      'INSERT INTO milestones (title, date, description, importance) VALUES (?, ?, ?, ?)',
      [title, date, description, validImportance]
    );
    
    const newMilestone = await db.get('SELECT * FROM milestones WHERE id = ?', result.lastID);
    res.status(201).json(newMilestone);
  } catch (error) {
    console.error('Error creating milestone:', error);
    res.status(500).json({ error: 'Failed to create milestone' });
  }
});

// Update a milestone
router.put('/:id', async (req, res) => {
  const { title, date, description, importance } = req.body;
  
  if (!title || !date || !description) {
    return res.status(400).json({ error: 'Title, date, and description are required' });
  }
  
  try {
    const validImportance = importance === 'major' ? 'major' : 'normal';
    
    await db.run(
      'UPDATE milestones SET title = ?, date = ?, description = ?, importance = ? WHERE id = ?',
      [title, date, description, validImportance, req.params.id]
    );
    
    const updatedMilestone = await db.get('SELECT * FROM milestones WHERE id = ?', req.params.id);
    if (!updatedMilestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    
    res.json(updatedMilestone);
  } catch (error) {
    console.error('Error updating milestone:', error);
    res.status(500).json({ error: 'Failed to update milestone' });
  }
});

// Delete a milestone
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.run('DELETE FROM milestones WHERE id = ?', req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    
    res.json({ message: 'Milestone deleted successfully' });
  } catch (error) {
    console.error('Error deleting milestone:', error);
    res.status(500).json({ error: 'Failed to delete milestone' });
  }
});

module.exports = router;
