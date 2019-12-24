import mongoose from "mongoose";
import Tag from "./Tag";

const tagSchema = Tag.schema;

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  creator_id: {
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
