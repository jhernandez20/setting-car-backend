const { authJwt } = require("../middleware");

module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const router = require("express").Router();
  router.get("/", [authJwt.verifyToken], tutorials.findAll);
  router.post("/", [authJwt.verifyToken], tutorials.create);
  router.get("/published", [authJwt.verifyToken], tutorials.findAllPublished);
  router.get("/:id", [authJwt.verifyToken], tutorials.findOne);
  router.put("/:id", [authJwt.verifyToken], tutorials.update);
  router.delete("/:id", [authJwt.verifyToken], tutorials.delete);
  router.delete("/", [authJwt.verifyToken], tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
