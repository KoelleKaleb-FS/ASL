const express = require('express');
const router = express.Router();
const { Star } = require('../models');

// Show all stars
router.get('/', async (req, res) => {
  try {
    const stars = await Star.findAll();
    res.render('star/index', { stars });
  } catch (error) {
    console.error('Error fetching stars:', error);
    res.status(500).send('Server error');
  }
});

// Show form to create a new star
router.get('/new', (req, res) => {
  res.render('star/new');
});

// Create a new star
router.post('/', async (req, res) => {
  try {
    await Star.create(req.body);
    res.redirect('/stars');
  } catch (error) {
    console.error('Error creating star:', error);
    res.status(500).send('Server error');
  }
});

// Show details of a single star
router.get('/:id', async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    console.log('Fetching star:', star); // Debug log
    if (star) {
      res.render('star/view', { star });
    } else {
      res.status(404).send('Star not found');
    }
  } catch (error) {
    console.error('Error fetching star:', error);
    res.status(500).send('Server error');
  }
});

// Get all planets for a specific star by ID
router.get('/:id/planets', async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id, {
      include: {
        model: require('../models').Planet,
        as: 'planets'
      }
    });
    if (star) {
      res.render('star/planets', { star, planets: star.planets });
    } else {
      res.status(404).send('Star not found');
    }
  } catch (error) {
    console.error('Error fetching planets for star:', error);
    res.status(500).send('Server error');
  }
});





// Show form to edit an existing star
router.get('/:id/edit', async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      res.render('star/edit', { star });
    } else {
      res.status(404).send('Star not found');
    }
  } catch (error) {
    console.error('Error fetching star:', error);
    res.status(500).send('Server error');
  }
});

// Update an existing star
router.put('/:id', async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      console.log('Updating star with data:', req.body);
      await star.update(req.body);
      console.log('Updated star:', star);
      res.redirect(`/stars/${star.id}`);
    } else {
      res.status(404).send('Star not found');
    }
  } catch (error) {
    console.error('Error updating star:', error);
    res.status(500).send('Server error');
  }
});


// Delete a star
router.delete('/:id', async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      await star.destroy();
      res.redirect('/stars');
    } else {
      res.status(404).send('Star not found');
    }
  } catch (error) {
    console.error('Error deleting star:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
