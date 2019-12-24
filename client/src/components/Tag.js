import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: 10px;

  border-radius: 10px;

  background-color: #42aaf5;
  color: #ffffff;
`;

const StyledButton = styled.button`
  margin-left: 10px;

  outline: none;
  pointer-events: auto;
  background-color: transparent;
  color: #ffffff;
  padding-bottom: 10px;
  border: 0;
  padding: 0;
  &:focus {
    outline: none;
  }
`;

const Tag = ({ value, onClear }) => {
  return (
    <StyledDiv>
      {value} <StyledButton onClick={onClear}>x</StyledButton>
    </StyledDiv>
  );
};

export default Tag;
