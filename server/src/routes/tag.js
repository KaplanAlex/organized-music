import { Router } from "express";

import Tag from "../models/Tag";

const router = Router();

/**
 * GET "/tag/"
 * Retreive all of the tags created by the user
 */
router.get("/", (req, res) => {
  const { user } = req;
  return res.send({ tags: user.tags });
});

router.post("/", (req, res) => {
  const { user } = req;
  const { tag } = req.body;

  const { tags } = user;

  // Handle duplicate user-tag names
  const duplicates = tags.filter(userTag => userTag.value == tag.value);
  if (duplicates.length) {
    return res
      .status(400)
      .send({ err: "Cannot have two tags with the same name." });
  }

  // Create the new tag
  const newTag = new Tag({
    value: tag.value,
    creator_id: user._id
  });
  newTag.save();

  tags.push(newTag);
  user.tags = tags;
  user.save();

  return res.send({ tags });
});

export default router;
