import mongoose from "mongoose";
import Tag from "./Tag";

const tagSchema = Tag.schema;

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  spotifyId: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  creatorId: {
    type: String,
    required: true
  },
  tags: {
    type: [tagSchema],
    default: []
  }
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
