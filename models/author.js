module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  Author.associate = function(models) {
    // Associating Author with Moves
    // When an Author is deleted, also delete any associated Moves
    Author.hasMany(models.Move, {
      onDelete: "cascade"
    });
  };

  return Author;
};