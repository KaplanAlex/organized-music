import mongoose from "mongoose";
import Tag from "./Tag";

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
    // this is the spotify "username"
    type: String, // is this what we call a spotify username??
    required: true
  },
  displayName: {
    type: String, // not all users have this, it defaults to their id/username
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
  }
});

const User = mongoose.model("User", userSchema);
export default User;
