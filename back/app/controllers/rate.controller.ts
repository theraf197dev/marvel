const Rate = require("../models/rate.model.ts");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const rate = new Rate({
    userId: req.body.userId,
    heroId: req.body.heroId,
    rate: req.body.rate
  });

  Rate.create(rate, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the rate."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const updateRate = new Rate({
    userId: req.body.userId,
    heroId: req.body.heroId,
    rate: req.body.rate
  });

  Rate.updateById(
    updateRate,
    new Rate(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found rate with id `
          });
        } else {
          res.status(500).send({
            message: "Error updating rate with id"
          });
        }
      } else res.send(data);
    }
  );
};

exports.findOne = (req, res) => {

  const findRate = new Rate({
    userId: req.query.userId,
    heroId: req.query.heroId
  });

  Rate.findOne(findRate, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rate."
      });
    else res.send(data);
  });
};

exports.getAverage = (req, res) => {
  const heroId = req.query.heroId;

  Rate.getAverage(heroId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rate."
      });
    else res.send(data);
  });
};