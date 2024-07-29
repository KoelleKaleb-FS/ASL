// models/planet.js
module.exports = (sequelize, DataTypes) => {
  const Planet = sequelize.define('Planet', {
    name: DataTypes.STRING,
    size: DataTypes.STRING,
    description: DataTypes.TEXT,
    imagePath: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});

  Planet.associate = function(models) {
    Planet.belongsToMany(models.Star, {
      through: models.StarsPlanets,
      foreignKey: 'PlanetId',
      as: 'stars'
    });
  };

  return Planet;
};
