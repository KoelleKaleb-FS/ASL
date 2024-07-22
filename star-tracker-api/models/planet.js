module.exports = (sequelize, DataTypes) => {
    const Planet = sequelize.define('Planet', {
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
  
    Planet.associate = (models) => {
      Planet.belongsToMany(models.Star, { through: 'StarsPlanets' });
    };
  
    return Planet;
  };
  