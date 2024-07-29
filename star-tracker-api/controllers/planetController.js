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

// List all planets
exports.list = async (req, res) => {
  try {
    const planets = await Planet.findAll();
    if (req.headers['content-type'] === 'application/json') {
      res.json(planets);
    } else {
      res.render('planets/index', { planets });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Show form to create a new planet
exports.showCreateForm = (req, res) => {
  res.render('planets/new');
};

// Create a new planet
exports.create = [
  upload.single('image'),
  async (req, res) => {
    try {
      const planetData = req.body;
      if (req.file) {
        planetData.imagePath = `uploads/${req.file.filename}`;
      }
      const planet = await Planet.create(planetData);
      if (req.headers['content-type'] === 'application/json') {
        res.json(planet);
      } else {
        res.redirect('/planets');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
];

// Show a specific planet by ID
exports.show = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id, {
      include: Star
    });
    if (planet) {
      if (req.headers['content-type'] === 'application/json') {
        res.json(planet);
      } else {
        res.render('planets/show', { planet });
      }
    } else {
      res.status(404).send('Planet not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Show form to edit an existing planet
exports.showEditForm = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      res.render('planets/edit', { planet });
    } else {
      res.status(404).send('Planet not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Update a specific planet by ID
exports.update = [
  upload.single('image'),
  async (req, res) => {
    try {
      const planet = await Planet.findByPk(req.params.id);
      if (planet) {
        const planetData = req.body;
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
      console.error(error);
      res.status(500).send('Server error');
    }
  }
];

// Delete a specific planet by ID
exports.delete = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      await planet.destroy();
      if (req.headers['content-type'] === 'application/json') {
        res.json({ message: 'Planet deleted' });
      } else {
        res.redirect('/planets');
      }
    } else {
      res.status(404).send('Planet not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
