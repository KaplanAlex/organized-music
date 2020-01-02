import React, { useEffect, useState } from "react";
import axios from "axios";

import SignIn from "./pages/SignIn";

import GlobalStyles from "./styles.js/Global";
import NavRoutes from "./NavRoutes";

const App = () => {
  // Validate login with request for user.
  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
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

  return loading ? (
    ""
  ) : (
    <>
      <GlobalStyles />
      {user ? <NavRoutes user={user} /> : <SignIn />}
    </>
  );
};

export default App;
