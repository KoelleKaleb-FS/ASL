const express = require('express');
const router = express.Router();
const { Planet, Star } = require('../models');

// Get all planets
router.get('/', async (req, res) => {
  try {
    const planets = await Planet.findAll();
    res.json(planets);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Create a new planet
router.post('/', async (req, res) => {
  try {
    const planet = await Planet.create(req.body);
    res.json(planet);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get a specific planet by ID
router.get('/:id', async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      res.json(planet);
    } else {
      res.status(404).send('Planet not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update a specific planet by ID
router.put('/:id', async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      await planet.update(req.body);
      res.json(planet);
    } else {
      res.status(404).send('Planet not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Delete a specific planet by ID
router.delete('/:id', async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      await planet.destroy();
      res.json({ message: 'Planet deleted' });
    } else {
      res.status(404).send('Planet not found');
    }
  } catch (error) {
    console.error(error);
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
      res.json(planet.Stars);
    } else {
      res.status(404).send('Planet not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
