module.exports = (sequelize, DataTypes) => {
  const Star = sequelize.define('Star', {
    name: DataTypes.STRING,
    size: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});

  Star.associate = function(models) {
    // Star belongs to many Planets through StarsPlanets
    Star.belongsToMany(models.Planet, {
      through: models.StarsPlanets,
      foreignKey: 'StarId',
      as: 'planets'
    });
  };

  return Star;
};
