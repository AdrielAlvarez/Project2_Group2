var db = require("../models");

module.exports = function(app) {
  // Get all moves
  app.get("/api/moves", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // In this case, just db.Post
    db.Move.findAll({
      include: [db.Author]
    }).then(function(dbMoves) {
      res.json(dbMoves);
    });
  });

  // Create a new move
  app.post("/api/moves", function(req, res) {
    db.Move.create(req.body).then(function(dbMoves) {
      res.json(dbMoves);
    });
  });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
