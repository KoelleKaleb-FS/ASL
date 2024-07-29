const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Planet, Star } = require('../models');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Get all planets
router.get('/', async (req, res) => {
  try {
    const planets = await Planet.findAll();
    res.render('planets/index', { planets });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Show form to create a new planet
router.get('/new', (req, res) => {
  res.render('planets/new');
});

// Create a new planet
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const planetData = {
      name: req.body.name,
      size: req.body.size,
      description: req.body.description,
    };

    if (req.file) {
      planetData.imagePath = `uploads/${req.file.filename}`;
    }

    const planet = await Planet.create(planetData);
    res.redirect(`/planets/${planet.id}`);
  } catch (error) {
    console.error('Error creating planet:', error);
    res.status(500).send('Server error');
  }
});

// Show a specific planet by ID
router.get('/:id', async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id, {
      include: Star
    });
    if (planet) {
      res.render('planets/view', { planet });
    } else {
      res.status(404).send('Planet not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Show form to edit an existing planet
router.get('/:id/edit', async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      res.render('planets/edit', { planet });
    } else {
      res.status(404).send('Planet not found');
    }
  } catch (error) {
    console.error('Error retrieving planet for edit:', error);
    res.status(500).send('Server error');
  }
});

// Update a specific planet by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  console.log('PUT request received for /planets/' + req.params.id); // Debugging log
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      const planetData = {
        name: req.body.name,
        size: req.body.size,
        description: req.body.description,
      };

      if (req.file) {
        planetData.imagePath = `uploads/${req.file.filename}`;
      }

      await planet.update(planetData);
      if (req.headers['content-type'] === 'application/json') {
        res.json(planet);
      } else {
        res.redirect(`/planets/${planet.id}`);
      }
    } else {
      res.status(404).send('Planet not found');
    }
  } catch (error) {
    console.error('Error updating planet:', error);
    res.status(500).send('Server error');
  }
});



// Delete a specific planet by ID
router.delete('/:id', async (req, res) => {
  console.log('DELETE request received for /planets/' + req.params.id); // Debugging log
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      await planet.destroy();
      console.log(`Planet with ID ${req.params.id} deleted`); // Debugging log
      res.redirect('/planets'); // Ensure this is the correct redirection
    } else {
      res.status(404).send('Planet not found');
    }
  } catch (error) {
    console.error('Error deleting planet:', error);
    res.status(500).send('Server error');
  }
});


// Get all stars for a specific planet by ID
router.get('/:id/stars', async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id, {
      include: Star
    });
    if (planet) {
      res.render('planets/stars', { stars: planet.Stars });
    } else {
      res.status(404).send('Planet not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
