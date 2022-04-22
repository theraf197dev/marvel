module.exports = app => {
  const comments = require("../controllers/comment.controller.ts");

  var router = require("express").Router();

  router.post("/", comments.create);

  router.get("/", comments.findAll);

  app.use('/api/comment', router);
};
