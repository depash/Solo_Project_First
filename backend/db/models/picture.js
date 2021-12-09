'use strict';
module.exports = (sequelize, DataTypes) => {
  const picture = sequelize.define('picture', {
    picture: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {});
  picture.associate = function (models) {
    picture.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' })
    picture.belongsTo(models.Album, { foreignKey: 'userId', onDelete: 'CASCADE' })
  };
  return picture;
};
