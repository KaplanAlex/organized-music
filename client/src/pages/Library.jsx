import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { getSpotifyLibraryPlaylists } from "../api/spotify";

import PlaylistCard from "../components/PlaylistCard";
import SearchBox from "../components/SearchBox";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [playlistData, setPlaylistData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [nextOffset, setNextOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [moreResultsAvailable, setMoreResultsAvailable] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [loading, moreResultsAvailable]);

  // Must be recreated when the values of loading and moreResultsAvailable are updated.
  const handleScroll = () => {
    if (loading || !moreResultsAvailable) return;

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadPlaylists();
    }
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  // Update displayed playlists based on seach string.
  useEffect(() => {
    const currData = playlistData.filter(
      playlist =>
        playlist.name.toLowerCase().indexOf(searchInput.toLowerCase()) != -1
    );

    setDisplayData(currData);
  }, [playlistData, searchInput, setDisplayData]);

  const handleSearchChange = e => {
    const { value } = e.target;
    setSearchInput(value);
  };
  const handleSearchClear = () => {
    setSearchInput("");
  };

  // Load set of playlists based on current offset
  const loadPlaylists = () => {
    setLoading(true);
    getSpotifyLibraryPlaylists(nextOffset)
      .then(data => {
        setPlaylistData(playlistData.concat(data.playlists));
        setNextOffset(data.nextOffset);
        setTotal(data.total);
        setMoreResultsAvailable(data.nextOffset < data.total);
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Library</h1>
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
          <PlaylistCard key={playlist.spotifyId} playlist={playlist} />
        ))}
      </Flex>
      {moreResultsAvailable && (
        <div>
          <span>
            Showing {nextOffset} playlists of {total}
          </span>
          <button onClick={loadPlaylists}>Load more playlists</button>
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

export default Home;
