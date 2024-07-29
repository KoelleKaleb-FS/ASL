const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const methodOverride = require('method-override');
const { sequelize } = require('./models');
const galaxyRoutes = require('./routes/galaxy');
const starRoutes = require('./routes/star');
const planetRoutes = require('./routes/planet');

const app = express();

// Set up EJS for templating
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up multer for image uploads
const upload = multer({ dest: 'uploads/' });

// Middleware for parsing JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.get('/favicon.ico', (req,res) => res.status(204));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/galaxies', galaxyRoutes);
app.use('/stars', starRoutes);
app.use('/planets', planetRoutes);

//Test route
app.get('/test', (req, res)=> {
  res.render('test', {stars: [{id:1, name: 'Test Star'}] })
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

// Sync the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
