// routes/galaxy.js
const express = require('express');
const router = express.Router();
const { Galaxy, Star } = require('../models');

// Get all galaxies
router.get('/', async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();
    res.json(galaxies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Create a new galaxy
router.post('/', async (req, res) => {
  try {
    const galaxy = await Galaxy.create(req.body);
    res.json(galaxy);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get a specific galaxy by ID
router.get('/:id', async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      res.json(galaxy);
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update a specific galaxy by ID
router.put('/:id', async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      await galaxy.update(req.body);
      res.json(galaxy);
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Delete a specific galaxy by ID
router.delete('/:id', async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      await galaxy.destroy();
      res.json({ message: 'Galaxy deleted' });
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (error) {
    console.error(error);
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
      res.json(galaxy.Stars);
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
