import React, { useState, useContext } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import PlaylistCard from "../components/PlaylistCard";
import SearchBox from "../components/SearchBox";
import UserContext from "../context/UserContext";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");

  // Retreive user object to extract playlists and tags
  const { user } = useContext(UserContext);

  const { playlists, tags } = user;

  const handleSearchChange = e => {
    const { value } = e.target;
    setSearchInput(value);
  };
  const handleSearchClear = () => {
    setSearchInput("");
  };

  return (
    <div
      css={css`
        min-height: 100vh;
      `}
    >
      <h1>Home</h1>
      <div
        css={css`
          padding-top: 15px;
          padding-bottom: 15px;
          flex: 1;
        `}
      >
        <SearchBox
          value={searchInput}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
        />
      </div>
      <Flex>
        {playlists.map(playlist => (
          <PlaylistCard key={playlist.spotifyId} playlist={playlist} />
        ))}
      </Flex>
    </div>
  );
};

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

export default Home;
