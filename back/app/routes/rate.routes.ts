module.exports = app => {
  const rates = require("../controllers/rate.controller.ts");

  var router = require("express").Router();

  router.post("/", rates.create);

  router.get("/", rates.findOne);

  router.get("/average", rates.getAverage);

  router.put("/", rates.update);

  app.use('/api/rate', router);
};
