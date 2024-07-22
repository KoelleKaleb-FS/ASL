const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Galaxy, Star, Planet } = require('./models');
const galaxyRoutes = require('./routes/galaxy');
const starRoutes = require('./routes/star');
const planetRoutes = require('./routes/planet');

const app = express();
app.use(bodyParser.json());

app.use('/galaxies', galaxyRoutes);
app.use('/stars', starRoutes);
app.use('/planets', planetRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(async () => {
  console.log('Database synced');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
