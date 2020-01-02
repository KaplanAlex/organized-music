import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { css } from "@emotion/core";

import navButtons from "./config/navButtons";
import Navbar from "./components/Navbar";
import Tagged from "./pages/Home";

const NavRoutes = ({ user }) => {
  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      `}
    >
      <Router>
        <Navbar user={user} navButtons={navButtons} />
        <div
          css={css`
            background-color: #f3f3f3;
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
              <h1>Library</h1>
            </Route>
            <Route path="/search">
              <h1>Search</h1>
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

export default NavRoutes;
