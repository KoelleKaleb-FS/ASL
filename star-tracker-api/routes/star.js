const express = require('express');
const router = express.Router();
const { Star, Planet } = require('../models');

// Get all stars
router.get('/', async (req, res) => {
  try {
    const stars = await Star.findAll();
    res.json(stars);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Create a new star
router.post('/', async (req, res) => {
  try {
    const star = await Star.create(req.body);
    res.json(star);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get a specific star by ID
router.get('/:id', async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      res.json(star);
    } else {
      res.status(404).send('Star not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update a specific star by ID
router.put('/:id', async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      await star.update(req.body);
      res.json(star);
    } else {
      res.status(404).send('Star not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Delete a specific star by ID
router.delete('/:id', async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      await star.destroy();
      res.json({ message: 'Star deleted' });
    } else {
      res.status(404).send('Star not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get all planets for a specific star by ID
router.get('/:id/planets', async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id, {
      include: Planet
    });
    if (star) {
      res.json(star.Planets);
    } else {
      res.status(404).send('Star not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Associate a planet with a star
router.post('/:id/planets', async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (!star) {
      return res.status(404).send('Star not found');
    }

    const planet = await Planet.findByPk(req.body.planetId);
    if (!planet) {
      return res.status(404).send('Planet not found');
    }

    await star.addPlanet(planet);
    res.json({ message: 'Planet associated with star successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
