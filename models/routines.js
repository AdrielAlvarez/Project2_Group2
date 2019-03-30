module.exports = function(sequelize, DataTypes) {
  var Routine = sequelize.define("Routine", {
    name: DataTypes.STRING,
    steps: DataTypes.STRING
  });

  Routine.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Routine.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Routine;
};
