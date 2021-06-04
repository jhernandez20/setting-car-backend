module.exports = (app) => {
  const comments = require("../controllers/comment.controller.js");

  var router = require("express").Router();

  // Create a new comment
  router.post("/", comments.createComment);

  // Retrieve a single Tutorial with id
  router.get("/:id", comments.findCommentById);

  router.get("/", comments.findAll);

  app.use("/api/comments", router);
};
