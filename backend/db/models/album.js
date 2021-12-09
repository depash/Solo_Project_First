'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Album.associate = function (models) {
    Album.hasMany(models.picture, { foreignKey: 'albumId', onDelete: 'cascade' })
  };
  return Album;
};
