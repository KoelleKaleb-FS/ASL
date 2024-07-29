// models/starsPlanets.js
module.exports = (sequelize, DataTypes) => {
  const StarsPlanets = sequelize.define('StarsPlanets', {
    StarId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Stars',
        key: 'id',
      },
      allowNull: false,
    },
    PlanetId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Planets',
        key: 'id',
      },
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {});
  StarsPlanets.associate = function(models) {
    // Define associations here if needed
    StarsPlanets.belongsTo(models.Star, {
      foreignKey: 'StarId',
      as: 'star'
    });

    StarsPlanets.belongsTo(models.Planet, {
      foreignKey: 'PlanetId',
      as: 'planet'
    });
  };
  return StarsPlanets;
};
