module.exports = app => {
  const users = require("../controllers/user.controller.ts");

  var router = require("express").Router();

  router.post("/", users.create);

  router.get("/", users.findAll);

  app.use('/api/user', router);
};
