module.exports = (sequelize, DataTypes) => {
    const StarsPlanets = sequelize.define('StarsPlanets', {
      StarId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Stars',
          key: 'id',
        },
      },
      PlanetId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Planets',
          key: 'id',
        },
      },
    });
  
    return StarsPlanets;
  };
  