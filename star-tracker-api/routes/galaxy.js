const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Galaxy, Star } = require('../models');

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Get all galaxies
router.get('/', async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();
    if (req.headers['content-type'] === 'application/json') {
      res.json(galaxies);
    } else {
      res.render('galaxies/index', { galaxies });
    }
  } catch (error) {
    console.error('Error fetching galaxies:', error);
    res.status(500).send('Server error');
  }
});

// Render form to create a new galaxy
router.get('/new', (req, res) => {
  res.render('galaxies/new');
});

// Create a new galaxy
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const galaxyData = req.body;
    if (req.file) {
      galaxyData.imagePath = `uploads/${req.file.filename}`;
    }
    const galaxy = await Galaxy.create(galaxyData);
    if (req.headers['content-type'] === 'application/json') {
      res.json(galaxy);
    } else {
      res.redirect('/galaxies');
    }
  } catch (error) {
    console.error('Error creating galaxy:', error);
    res.status(500).send('Server error');
  }
});

// Get a specific galaxy by ID
router.get('/:id', async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      if (req.headers['content-type'] === 'application/json') {
        res.json(galaxy);
      } else {
        res.render('galaxies/show', { galaxy });
      }
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (error) {
    console.error('Error fetching galaxy:', error);
    res.status(500).send('Server error');
  }
});

// Render form to edit a galaxy
router.get('/:id/edit', async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      res.render('galaxies/edit', { galaxy });
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (error) {
    console.error('Error fetching galaxy for edit:', error);
    res.status(500).send('Server error');
  }
});

// Update a specific galaxy by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      const galaxyData = req.body;
      if (req.file) {
        galaxyData.imagePath = `uploads/${req.file.filename}`;
      }
      await galaxy.update(galaxyData);
      if (req.headers['content-type'] === 'application/json') {
        res.json(galaxy);
      } else {
        res.redirect(`/galaxies/${req.params.id}`);
      }
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (error) {
    console.error('Error updating galaxy:', error);
    res.status(500).send('Server error');
  }
});

// Delete a specific galaxy by ID
router.delete('/:id', async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      await galaxy.destroy();
      if (req.headers['content-type'] === 'application/json') {
        res.json({ message: 'Galaxy deleted' });
      } else {
        res.redirect('/galaxies');
      }
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (error) {
    console.error('Error deleting galaxy:', error);
    res.status(500).send('Server error');
  }
});

// Get all stars for a specific galaxy by ID
router.get('/:id/stars', async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id, {
      include: Star
    });
    if (galaxy) {
      if (req.headers['content-type'] === 'application/json') {
        res.json(galaxy.Stars);
      } else {
        res.render('galaxies/stars', { galaxy, stars: galaxy.Stars });
      }
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (error) {
    console.error('Error fetching stars for galaxy:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
