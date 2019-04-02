module.exports = function(sequelize, DataTypes) {
  var Move = sequelize.define("Move", {
    name: DataTypes.STRING,
    steps: DataTypes.STRING
  });

  Move.associate = function(models) {
    // We're saying that a Move should belong to an Author
    // A Move can't be created without an Author due to the foreign key constraint
    Move.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Move;
};