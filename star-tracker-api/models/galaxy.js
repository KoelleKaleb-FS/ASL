// models/galaxy.js
module.exports = (sequelize, DataTypes) => {
    const Galaxy = sequelize.define('Galaxy', {
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
  
    Galaxy.associate = (models) => {
      Galaxy.hasMany(models.Star);
    };
  
    return Galaxy;
  };
  