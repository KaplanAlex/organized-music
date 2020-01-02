import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Loader from "./Loader";

const StyledButton = styled.button`
  border-radius: 45px;
  background-color: ${props => (props.secondary ? "#F7A072" : "#1ed760")};
  color: #ffffff;
  padding: 5px;
  font-size: ${props => {
    if (props.big) return "20px";
    return "16px";
  }};

  border: none;
  &:focus {
    outline: none;
  }
  &:hover {
    ${props => {
      if (props.hoverColor && props.hoverBorder) {
        return `background-color: ${props.hoverColor}; border: 2px solid ${props.hoverColor}`;
      } else if (props.hoverColor) {
        return `background-color: ${props.hoverColor};`;
      }
    }}
  }
  &:active {
    ${props => {
      if (props.pressedColor)
        return css`
          background: ${props.pressedColor};
          border: 2px solid ${props.pressedColor};
          color: #ffffff;
        `;
    }}
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
