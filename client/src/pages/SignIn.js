import React from "react";
import { css } from "@emotion/core";

import Container from "../components/Container";
import Button from "../components/Button";

const SignIn = () => {
  return (
    <Container
      css={css`
        justify-content: center;
        align-items: center;
      `}
    >
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

export default SignIn;
