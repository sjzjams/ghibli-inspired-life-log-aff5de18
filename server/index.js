
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
let db;
async function setupDatabase() {
  try {
    db = await open({
      filename: path.join(__dirname, 'database.sqlite'),
      driver: sqlite3.Database
    });
    
    console.log('Connected to SQLite database');
    
    // Create tables if they don't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        date TEXT NOT NULL,
        category TEXT,
        imageUrl TEXT
      );
      
      CREATE TABLE IF NOT EXISTS milestones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        description TEXT NOT NULL,
        importance TEXT CHECK(importance IN ('normal', 'major')) NOT NULL DEFAULT 'normal'
      );
      
      CREATE TABLE IF NOT EXISTS gallery_photos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        category TEXT
      );
    `);
    
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Database setup error:', error);
  }
}

// Routes
app.use('/api/journal', require('./routes/journalRoutes'));
app.use('/api/milestones', require('./routes/milestoneRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));

// Start server
async function startServer() {
  await setupDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

module.exports = { db };
