import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { searchSpotifyPlaylists } from "../api/spotify";

import PlaylistCard from "../components/PlaylistCard";
import SearchBox from "../components/SearchBox";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [displayData, setDisplayData] = useState([]);
  const [nextOffset, setNextOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const loadMore = nextOffset < total;

  const handleSearchChange = e => {
    const { value } = e.target;
    setSearchInput(value);
    if (value.length) {
      searchPlaylists(value);
    }
  };

  const handleSearchClear = () => {
    setSearchInput("");
  };

  // Manage search here to potentially throttle requests in the future
  const searchPlaylists = searchVal => {
    setLoading(true);
    searchSpotifyPlaylists(searchVal)
      .then(data => {
        setDisplayData(data.playlists);
        setNextOffset(data.nextOffset);
        setTotal(data.total);
      })
      .catch(err => {
        console.log("Load playlist error in Search.jsx", err);
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Search</h1>
      <div
        css={css`
          padding-bottom: 15px;
          padding-top: 15px;
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
        {displayData.map(playlist => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </Flex>
      {loadMore && (
        <div>
          <span>
            Showing {nextOffset} playlists of {total}
          </span>
          <button onClick={() => console.log("Load more!")}>
            Load more playlists
          </button>
        </div>
      )}
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

export default Search;
