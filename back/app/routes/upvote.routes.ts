module.exports = app => {
  const upvotes = require("../controllers/upvote.controller.ts");

  var router = require("express").Router();

  router.post("/", upvotes.create);

  router.get("/", upvotes.getOne);

  router.delete("/", upvotes.delete);

  app.use('/api/upvote', router);
};
