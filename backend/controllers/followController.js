const Follow = require('../models/followModel');

const followController = {
  followUser: async (req, res) => {
    const { seguido_id } = req.body;

    if (req.user.id === seguido_id) {
      return res.status(400).json({ error: "No puedes seguirte a ti mismo." });
    }

    try {
      const follow = await Follow.follow(req.user.id, seguido_id);
      res.status(201).json({ message: "Ahora sigues a este usuario", follow });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  unfollowUser: async (req, res) => {
    const { seguido_id } = req.body;

    try {
      const unfollow = await Follow.unfollow(req.user.id, seguido_id);
      if (!unfollow) {
        return res.status(404).json({ error: "No estabas siguiendo a este usuario." });
      }

      res.json({ message: "Has dejado de seguir a este usuario" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFollowers: async (req, res) => {
    try {
      const followers = await Follow.getFollowers(req.params.usuario_id);
      res.json(followers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFollowing: async (req, res) => {
    try {
      const following = await Follow.getFollowing(req.params.usuario_id);
      res.json(following);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = followController;
