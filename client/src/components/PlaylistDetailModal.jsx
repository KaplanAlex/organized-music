import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "@emotion/styled";

import UserContext from "../context/UserContext";
import Modal from "./Modal";
import SearchBox from "./SearchBox";

const PlaylistDetailModal = ({ open, closeModal, playableImage, tags }) => {
  const [searchInput, setSearchInput] = useState("");
  const [showTagList, setShowTagList] = useState(false);

  const { user } = useContext(UserContext);
  const { tags: userTags } = user;

  const handleSearchChange = e => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const handleSearchClear = () => {
    setSearchInput("");
  };

  const tagListRef = useRef(null);
  const manageClick = event => {
    if (tagListRef.current && !tagListRef.current.contains(event.target)) {
      setShowTagList(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", manageClick);
    return () => {
      document.removeEventListener("mousedown", manageClick);
    };
  }, []);

  return (
    <Modal open={open} closeModal={closeModal}>
      {playableImage}
      <div>Tags</div>
      <div>{tags}</div>

      <TagSearch ref={tagListRef}>
        <SearchBox
          value={searchInput}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          placeholder={"Add a tag"}
          roundTopOnly={true}
          onfocus={() => setShowTagList(true)}
        />
        <Divider />
        <div>
          {showTagList &&
            userTags.map(tag => {
              return (
                <div key={tag._id}>
                  <SearchListItem>{tag.value}</SearchListItem>
                  <Divider />
                </div>
              );
            })}
        </div>
      </TagSearch>
    </Modal>
  );
};

const Divider = styled.div`
  height: 1px;
  background-color: #e6e6e6;
`;

const TagSearch = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
`;

const SearchListItem = styled.div`
  background-color: #ffffff;
  padding: 10px 10px;
`;

export default PlaylistDetailModal;
