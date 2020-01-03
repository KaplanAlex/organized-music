import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { getSpotifyLibraryPlaylists } from "../api/library";

import PlaylistCard from "../components/PlaylistCard";
import SearchBox from "../components/SearchBox";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [playlistData, setPlaylistData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [nextOffset, setNextOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const loadMore = nextOffset < total;

  useEffect(() => {
    setLoading(true);
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
      })
      .catch(err => {
        console.log("Load playlist error in Library.jsx", err);
      })
      .then(() => {
        setLoading(false);
      });
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
        {displayData.map(playlist => (
          <PlaylistCard
            key={playlist.id}
            name={playlist.name}
            description={playlist.description}
            img={playlist.image}
          />
        ))}
      </Flex>
      {loadMore && (
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
