import mongoose from "mongoose";

import Playlist from "./Playlist";
import Tag from "./Tag";

const playlistSchema = Playlist.schema;
const tagSchema = Tag.schema;

const userSchema = new mongoose.Schema({
  spotifyAuth: {
    accessToken: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    },
    tokenExp: {
      type: Number,
      required: true
    }
  },
  spotifyId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  profileImage: {
    url: {
      type: String
    },
    height: {
      type: Number
    },
    width: {
      type: Number
    }
  },
  profileUrl: {
    type: String // could be useful
  },
  spotifyApiUrl: {
    type: String
  },
  tags: {
    type: [tagSchema],
    default: []
  },
  playlists: {
    type: [playlistSchema],
    default: []
  }
});

const User = mongoose.model("User", userSchema);
export default User;
