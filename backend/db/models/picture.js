'use strict';
module.exports = (sequelize, DataTypes) => {
  const picture = sequelize.define('picture', {
    picture: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {});
  picture.associate = function(models) {
    // associations can be defined here
  };
  return picture;
};