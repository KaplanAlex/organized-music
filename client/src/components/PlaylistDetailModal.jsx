import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "@emotion/styled";

import UserContext from "../context/UserContext";
import Modal from "./Modal";
import { TagSelector } from "./TagSelector";

const PlaylistDetailModal = ({ open, closeModal, playableImage, playlist }) => {
  const { spotifyId: id, name, description, imageURL, tags } = playlist;

  // Retreive user object to extract tags
  const { user, setUser } = useContext(UserContext);
  const { tags: userTags } = user;

  return (
    <Modal open={open} closeModal={closeModal}>
      {playableImage}
      <div>Tags</div>
      <div>{tags.map(tag => tag.value)}</div>
      <TagSelector playlist={playlist} />
    </Modal>
  );
};

export default PlaylistDetailModal;
