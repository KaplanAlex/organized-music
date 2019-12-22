import React from "react";

const App = () => {
  return (
    <div>
      <p>Let's start tagging!</p>
      <button
        onClick={() =>
          window.location.replace("http://localhost:5000/auth/login")
        }
      >
        Login with spotify
      </button>
    </div>
  );
};

export default App;
