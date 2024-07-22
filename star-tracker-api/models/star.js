// models/star.js
module.exports = (sequelize, DataTypes) => {
    const Star = sequelize.define('Star', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    });
  
    Star.associate = (models) => {
      Star.belongsTo(models.Galaxy);
      Star.belongsToMany(models.Planet, { through: 'StarsPlanets' });
    };
  
    return Star;
  };
  