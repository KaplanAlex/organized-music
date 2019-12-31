import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Button from "../components/Button";
import Container from "../components/Container";
import PlaylistCard from "../components/PlaylistCard";
// import Flex from "../components/Flex";
import Navbar from "../components/Navbar";

const Home = ({ user }) => {
  return (
    <>
      <Navbar user={user} />
      <div
        css={css`
          background-color: #f3f3f3;
          padding: 25px 25px 25px 150px;
        `}
      >
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
    </>
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
