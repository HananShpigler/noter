const express = require("express");

const Note = require("../models/note");
const auth = require("../middlewares/auth");

const router = new express.Router();

//Create Note
router.post("/notes", auth, async (req, res) => {
  const note = new Note({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await note.save();
    res.status(201).send({ note, message: "Note Saved" });
  } catch (error) {
    if (!note.content) {
      //Checks if content is empty
      res.status(500).send({
        message: "Content can not be empty",
      });
    } else {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
});

//Get All Notes
router.get("/notes", auth, async (req, res) => {
  try {
    await req.user.populate("notes");
    res.status(200).send(req.user.notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get Note By Id
router.get("/notes/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById({ _id: req.params.id });
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete Note
router.delete("/notes/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id });
    if (!note) {
      return res.status(404).send();
    }
    res.send({ message: "Note was deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
