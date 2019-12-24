import { Router } from "express";

const router = Router();

/**
 * GET "/playlists/"
 * Return all of the user's tagged playlists
 */
router.get("/", (req, res) => {
  const { user } = req;
  return res.send({ playlists: user.playlists });
});

export default router;
