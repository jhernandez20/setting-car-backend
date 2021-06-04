const { authJwt } = require("../middleware");


module.exports = (app) => {
  const tag = require("../controllers/tag.controller.js");

  var router = require("express").Router();

  // Create a new comment
  router.post("/",[authJwt.verifyToken], tag.create);

  // Retrieve a single Tutorial with id
 // router.get("/:id", [authJwt.verifyToken],tag.findCommentById);

  router.get("/", [authJwt.verifyToken],tag.findAll);

  app.use("/api/tag", router);
};
