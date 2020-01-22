import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "@emotion/styled";

import UserContext from "../context/UserContext";
import Modal from "./Modal";
import SearchBox from "./SearchBox";

const PlaylistDetailModal = ({ open, closeModal, playableImage, tags }) => {
  const [searchInput, setSearchInput] = useState("");
  const [showTagList, setShowTagList] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);
  // Retreive user object to extract tags
  const { user } = useContext(UserContext);
  const { tags: userTags } = user;

  // Only show unused tags
  const availableTags = userTags.filter(tag => tags.indexOf(tag.value) == -1);

  const handleSearchChange = e => {
    const { value } = e.target;
    setSearchInput(value);

    // Filter displayed options
    setTagOptions(
      availableTags.filter(
        tag => tag.value.toLowerCase().indexOf(value.toLowerCase()) !== -1
      )
    );
  };

  const handleSearchClear = () => {
    setSearchInput("");
  };

  const handleEnter = e => {
    // Catch enter key press
    if (e.keyCode == 13) {
      console.log("Submited", e.target.value);
    }
  };

  const tagListRef = useRef(null);
  const manageClick = event => {
    if (tagListRef.current && !tagListRef.current.contains(event.target)) {
      setShowTagList(false);
    }
  };

  useEffect(() => {
    setTagOptions(availableTags);

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
          roundTopOnly={showTagList && tagOptions.length}
          onfocus={() => setShowTagList(true)}
          onKeyDown={handleEnter}
        />

        <div>
          {showTagList &&
            tagOptions.map(tag => {
              return (
                <div key={tag._id} onClick={() => console.log(tag.value)}>
                  <Divider />
                  <SearchListItem>{tag.value}</SearchListItem>
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

const InvisibleButton = styled.button`
  border: none;
  background: none;
  flex: 1;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const TagSearch = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
`;

const SearchListItem = styled(InvisibleButton)`
  background-color: #ffffff;
  padding: 10px 10px;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: #f1f1f1;
  }

  &:active {
    background-color: #e4e4e4;
  }
`;

export default PlaylistDetailModal;
