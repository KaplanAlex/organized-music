import React, { useEffect, useState } from "react";
import axios from "axios";

import SignIn from "./pages/SignIn";

import GlobalStyles from "./styles.js/Global";
import NavRoutes from "./NavRoutes";
import { StyleProvider } from "./context/StyleContext";
import { UserProvider } from "./context/UserContext";

const App = () => {
  // Validate login with request for user.
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}/user`, { withCredentials: true })
      .then(user => {
        setUser(user.data.user);
      })
      .catch(err => {
        setUser(null);
        console.log("Fetch user err", err);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Remove scrollbar from nested components.
  const [scroll, setScroll] = useState(true);

  return loading ? (
    ""
  ) : (
    <>
      <GlobalStyles scroll={scroll} />
      {user ? (
        <UserProvider value={{ user: user, setUser: setUser }}>
          <StyleProvider value={{ toggleScroll: setScroll }}>
            <NavRoutes user={user} />
          </StyleProvider>
        </UserProvider>
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default App;
