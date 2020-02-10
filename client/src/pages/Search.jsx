import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import debounce from "lodash/debounce";

import { searchSpotifyPlaylists } from "../api/spotify";

import PlaylistCard from "../components/PlaylistCard";
import SearchBox from "../components/SearchBox";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayData, setDisplayData] = useState([]);
  const [nextOffset, setNextOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [moreResultsAvailable, setMoreResultsAvailable] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [loading, loadingMore, moreResultsAvailable]);

  // Must be recreated when the values of loading and moreResultsAvailable are updated.
  const handleScroll = () => {
    if (loading || loadingMore || !moreResultsAvailable) return;

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMoreResults();
    }
  };

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
    // Reset offset and search with the new, provided input
    searchSpotifyPlaylists(searchVal, 0)
      .then(data => {
        setDisplayData(data.playlists);
        setNextOffset(data.nextOffset);
        setTotal(data.total);
        setMoreResultsAvailable(data.nextOffset < data.total);
      })
      .then(() => {
        setLoading(false);
      });
  };

  // extend the current set of results
  const loadMoreResults = () => {
    setLoadingMore(true);

    searchSpotifyPlaylists(searchInput, nextOffset)
      .then(data => {
        setDisplayData(displayData.concat(data.playlists));
        setNextOffset(data.nextOffset);
        setTotal(data.total);
        setMoreResultsAvailable(data.nextOffset < data.total);
      })
      .then(() => {
        setLoadingMore(false);
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
      {moreResultsAvailable && (
        <div>
          <span>
            Showing {nextOffset} playlists of {total}
          </span>
          <button onClick={loadMoreResults}>Load more playlists</button>
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
