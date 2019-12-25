import React, { useEffect, useState } from "react";
import axios from "axios";
import { css } from "@emotion/core";

import SignIn from "./pages/SignIn";
import Button from "./components/Button";
import Container from "./components/Container";
import PlaylistCard from "./components/PlaylistCard";
import Flex from "./components/Flex";

const App = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then(user => {
        console.log(user);
        setUser(user);
      })
      .catch(err => {
        setUser(null);
        console.log(err);
      })
      .then(() => {
        console.log("Always execute!");
        setLoading(false);
      });
  }, []);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return loading ? (
    ""
  ) : user ? (
    <Container
      full
      css={css`
        background-color: #f3f3f3;
      `}
    >
      Lets start tagging!
      <Button
        onClick={() => window.location.replace("http://localhost:5000/user")}
        inverse
      >
        Get User from accessToken
      </Button>
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
    </Container>
  ) : (
    <SignIn />
  );
};

export default App;
