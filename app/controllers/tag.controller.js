const db = require("../models");
const Tutorial = db.tutorial;
const Tag = db.tag;

exports.create = (req, res) => {
  console.log(req.body);
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const tag = {
    name: req.body.name,
  };

  Tag.create(tag)
    .then((tag) => {
      console.log(">> Created Tag: " + JSON.stringify(tag, null, 2));
      res.send(comment);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.findAll = (req, res) => {
  Tag.findAll()
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


exports.findById = (id) => {
  return Tag.findByPk(id, {
    include: [
      {
        model: Tutorial,
        as: "tutorials",
        attributes: ["id", "title", "description"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((tag) => {
      return tag;
    })
    .catch((err) => {
      console.log(">> Error while finding Tag: ", err);
    });
};

exports.addTutorial = (tagId, tutorialId) => {
  return Tag.findByPk(tagId)
    .then((tag) => {
      if (!tag) {
        console.log("Tag not found!");
        return null;
      }
      return Tutorial.findByPk(tutorialId).then((tutorial) => {
        if (!tutorial) {
          console.log("Tutorial not found!");
          return null;
        }

        tag.addTutorial(tutorial);
        console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
        return tag;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};
