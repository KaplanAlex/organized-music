import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import Container from "../components/Container";
import Button from "../components/Button";

const StyledDivContainer = styled.div`
  height: 100%;
  background-color: #e6ecf0;
  display: flex;
  flex-direction: column;
  min-height: 100%;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const StyledDiv = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: stretch;
  flex-grow: 1;
  flex: 1;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const StyledLoginContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const StyledMessageContainer = styled.div`
  background-color: #1ed760;
  position: relative;
  flex: 1;
`;

const SignIn = () => {
  return (
    <StyledDivContainer>
      <StyledDiv>
        <StyledMessageContainer>"Content"</StyledMessageContainer>
        <StyledLoginContainer>
          <StyledLoginContent>
            <span
              css={css`
                align-self: flex-start;
                font-weight: bold;
              `}
            >
              Start organizing your music.
            </span>
            <Button
              css={css`
                min-width: 350px;
                margin-top: 10px;
                margin-bottom: 15px;
              `}
              onClick={() =>
                window.location.replace("http://localhost:5000/auth/login")
              }
            >
              Login with Spotify
            </Button>
            <Button
              css={css`
                min-width: 350px;
                width: 100%;
              `}
              onClick={() =>
                window.location.replace("https://www.spotify.com/us/signup/")
              }
              inverse
            >
              Sign Up for Spotify
            </Button>
          </StyledLoginContent>
        </StyledLoginContainer>
      </StyledDiv>
    </StyledDivContainer>
  );
};

export default SignIn;
