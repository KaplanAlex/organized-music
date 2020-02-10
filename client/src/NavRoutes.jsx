import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import navButtons from "./config/navButtons";
import Library from "./pages/Library";
import Navbar from "./components/Navbar";
import Tagged from "./pages/Home";
import Search from "./pages/Search";

const NavRoutes = ({ user }) => {
  return (
    <div
      css={css`
        height: 100%;
      `}
    >
      <Router>
        <Navbar user={user} navButtons={navButtons} />
        <FullScreenBackground />
        <div
          css={css`
            padding: 25px 25px 25px 150px;
            display: flex;
            flex: 1;
            flex-direction: column;
            align-items: stretch;
            height: 100%;
          `}
        >
          <Switch>
            <Route exact path="/">
              <Tagged />
            </Route>
            <Route path="/library">
              <Library />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route>
              <h1>404 Not found</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

const FullScreenBackground = styled.div`
  background-color: #f3f3f3;
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  z-index: -1;
`;

export default NavRoutes;
