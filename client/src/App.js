import React from "react";
import Button from "./components/Button";
import Container from "./components/Container";
import Row from "react-bootstrap/Row";
import PlaylistCard from "./components/PlaylistCard";

import { css } from "@emotion/core";
import Flex from "./components/Flex";

const App = () => {
  return (
    <Container
      full
      css={css`
        background-color: #f3f3f3;
      `}
    >
      <Row>Lets start tagging!</Row>
      <Flex>
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
      </Flex>
      <Button
        onClick={() =>
          window.location.replace("http://localhost:5000/auth/login")
        }
        inverse
      >
        Login with spotify
      </Button>
    </Container>
  );
};

export default App;
