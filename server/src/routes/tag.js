import { Router } from "express";

import { createTag } from "../services/tag";

const router = Router();

/**
 * GET "/tag/"
 * Retreive all of the tags created by the user
 */
router.get("/", (req, res) => {
  const { user } = req;
  return res.send({ tags: user.tags });
});

/**
 * POST "/tag/"
 * Body: {
 *  tag: {value: "name"},
 * }
 *
 * Create a new tag object in the database and link it
 * to the user.
 */
router.post("/", (req, res) => {
  const { user } = req;
  const { tag } = req.body;

  // Handle duplicate user-tag names
  newTag = createTag(tag, user);
  if (newTag.err) {
    return res.status(400).send({ err: newTag.err });
  }

  // Save updated user - must take place after all transactions.
  newTag.user.save();

  // Return newTag object and updated user to the client
  res.status(200).send(newTag);
});

export default router;
