import React, { useState } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import PlaylistCard from "../components/PlaylistCard";
import SearchBox from "../components/SearchBox";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = e => {
    const { value } = e.target;
    setSearchInput(value);
  };
  const handleSearchClear = () => {
    setSearchInput("");
  };

  return (
    <div>
      <div
        css={css`
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
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
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
