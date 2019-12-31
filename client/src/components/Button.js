import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Loader from "./Loader";

const StyledButton = styled.button`
  border-radius: 45px;
  background-color: ${props => (props.secondary ? "#F7A072" : "#1ed760")};
  color: #fff;
  padding: 5px;
  font-size: ${props => {
    if (props.big) return "20px";
    return "16px";
  }};
  outline: none;
  border: none;
  &:focus {
    outline: none;

    background: rgba(0, 0, 0, 0.25);
  }
  cursor: pointer;
  border: 2px solid ${props => (props.secondary ? "#F7A072" : "#1ed760")};
  ${props => {
    return (
      props.inverse &&
      css`
        background-color: #fff;
        color: #1ed760;
      `
    );
  }}
`;

const Button = ({ secondary, big, inverse, loading, children, ...props }) => {
  return (
    <StyledButton secondary={secondary} big={big} inverse={inverse} {...props}>
      {loading ? <Loader small white /> : children}
    </StyledButton>
  );
};

export default Button;
