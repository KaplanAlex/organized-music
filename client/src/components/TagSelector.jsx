import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "@emotion/styled";

import UserContext from "../context/UserContext";
import SearchBox from "./SearchBox";
import { tagPlaylist } from "../api/playlist";

const TagSelector = ({ playlist }) => {
  const { spotifyId: id, name, tags } = playlist;

  const [searchInput, setSearchInput] = useState("");
  const [showTagList, setShowTagList] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);

  // Retreive user object to extract tags
  const { user, setUser } = useContext(UserContext);
  const { tags: userTags } = user;

  // Only show unused tags
  const availableTags = userTags.filter(tag => tags.indexOf(tag.value) == -1);

  // Manage search input text change.
  useEffect(() => {
    // Filter tags based on search input
    var filteredTags = availableTags.filter(
      tag => tag.value.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
    );

    // Present "Create Tag" as an option when the input doesn't exactly match a tag value.
    const exactMatch =
      filteredTags.filter(tag => tag.value.toLowerCase() === searchInput)
        .length > 0;

    if (searchInput && !exactMatch) {
      const newTag = {
        value: `Create \"${searchInput}\"`,
        _id: null,
        realValue: searchInput
      };
      filteredTags.unshift(newTag);
    }

    setTagOptions(filteredTags);
  }, [searchInput, setTagOptions]);

  const handleSearchChange = e => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const handleTagSelect = tag => {
    // null id signifies "Create" tag
    var currTag = tag;
    if (tag._id === null) {
      currTag = { value: tag.realValue, _id: null };
    }

    // Set tag - DB
    tagPlaylist(currTag, playlist).then(tagResp => {
      const { updatedUser, updatedPlaylist } = tagResp;
      setUser(updatedUser);
    });

    // TODO dimiss and show tag locally or spinner
  };

  // TODO
  const handleEnter = e => {
    const { value } = e.target;

    // Catch enter key press
    if (e.keyCode == 13) {
      console.log("Submited", value);
      tagPlaylist({ value: "98th Tag" }, { name: name, spotifyId: id });
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
    <TagSearch ref={tagListRef}>
      <SearchBox
        value={searchInput}
        onChange={handleSearchChange}
        onClear={() => setSearchInput("")}
        placeholder={"Add a tag"}
        roundTopOnly={showTagList && tagOptions.length}
        onfocus={() => setShowTagList(true)}
        onKeyDown={handleEnter}
      />

      <div>
        {showTagList &&
          tagOptions.map(tag => {
            return (
              <div key={tag.value} onClick={() => handleTagSelect(tag)}>
                <Divider />
                <SearchListItem>{tag.value}</SearchListItem>
              </div>
            );
          })}
      </div>
    </TagSearch>
  );
};

const TagSearch = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 50%; */
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

const Divider = styled.div`
  height: 1px;
  background-color: #e6e6e6;
`;

export default TagSelector;
