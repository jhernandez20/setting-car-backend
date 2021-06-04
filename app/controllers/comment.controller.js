const db = require("../models");
const Tutorial = db.tutorials;
const Comment = db.comments;

exports.createComment = (req, res) => {
  console.log(req.body);
  if (!req.body.name || !req.body.text) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const comment = {
    name: req.body.name,
    text: req.body.text,
    tutorialId: req.body.tutorialId,
  };

  Comment.create(comment)
    .then((comment) => {
      console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
      res.send(comment);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.findCommentById = (req, res) => {
  const commentId = req.params.id;
  return Comment.findByPk(commentId, { include: ["tutorial"] })
    .then((comment) => {
      res.send(comment);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ include: ["comments"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
