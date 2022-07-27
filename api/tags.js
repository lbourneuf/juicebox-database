const express = require("express");
const tagsRouter = express.Router();
const { getAllTags } = require("../db");
const { getPostsByTagName } = require("../db");
tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({ tags });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;

  try {
    const tags = await getPostsByTagName(tagName);
    res.send({ posts: tags });
  } catch ({ name, message }) {
    next({
      name: "FailedToGetTags",
      message: "failed to get posts from the specified tags",
    });
  }
});

module.exports = tagsRouter;
