const Upvote = require("../models/upvote.model.ts");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const upvote = new Upvote({
    userId: req.body.userId,
    heroId: req.body.heroId
  });

  Upvote.create(upvote, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  console.log(res);
  const delUpvote = new Upvote({
    userId: req.query.userId,
    heroId: req.query.heroId
  });

  Upvote.remove(delUpvote, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found upvote with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Upvote with id " + req.params.id
        });
      }
    } else res.send({ message: `Upvote was deleted successfully!` });
  });
};

exports.getOne = (req, res) => {
  const getUpvote = new Upvote({
    userId: req.query.userId,
    heroId: req.query.heroId
  });

  Upvote.getOne(getUpvote, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving upvotes."
      });
    else res.send(data);
  });
};