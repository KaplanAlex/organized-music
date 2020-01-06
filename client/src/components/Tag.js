import React from "react";
import styled from "@emotion/styled";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: 10px;
  margin-bottom: 5px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
`;

const StyledButton = styled.button`
  margin-left: 10px;
  outline: none;
  pointer-events: auto;
  background-color: transparent;

  padding-bottom: 10px;
  border: 0;
  padding: 0;
  &:focus {
    outline: none;
  }
`;

const Tag = ({ value, onClear }) => {
  const truncated =
    value.length < 7 ? value : value.substring(0, 7).concat("...");
  return (
    <StyledDiv>
      {truncated} <StyledButton onClick={onClear}>x</StyledButton>
    </StyledDiv>
  );
};

export default Tag;
