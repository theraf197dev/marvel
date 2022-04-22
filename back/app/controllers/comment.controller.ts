const MComment = require("../models/comment.model.ts");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const comment = new MComment({
    userId: req.body.userId,
    heroId: req.body.heroId,
    comment: req.body.comment
  });

  MComment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the comment."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const heroId = req.query.heroId;

  MComment.getAll(heroId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    else res.send(data);
  });
};