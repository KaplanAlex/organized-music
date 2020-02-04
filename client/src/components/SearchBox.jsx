import React from "react";
import styled from "@emotion/styled";
import { Search, X } from "react-feather";

const SearchBox = ({
  value,
  onChange,
  onClear,
  onfocus,
  onKeyDown,
  placeholder,
  roundTopOnly
}) => {
  return (
    <SearchBoxContainer>
      <StyledLabel>
        <StyledInput
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          roundTopOnly={roundTopOnly}
          onFocus={onfocus}
          onKeyDown={onKeyDown}
        />
      </StyledLabel>
      <StyledDiv>
        <StyledIconSpan>
          <Search color="#121212" />
        </StyledIconSpan>
        {value ? (
          <StyledClear onClick={onClear}>
            <X />
          </StyledClear>
        ) : null}
      </StyledDiv>
    </SearchBoxContainer>
  );
};

const SearchBoxContainer = styled.div`
  display: inline-flex;
  position: relative;
`;

const StyledInput = styled.input`
  padding: 6px 48px;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  width: 100%;
  border: 0;
  border-radius: ${props =>
    props.roundTopOnly ? "10px 10px 0px 0px" : "10px"};
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

const StyledIconSpan = styled.span`
  -webkit-box-flex: 1;
  flex: 1;
`;

const StyledLabel = styled.label`
  position: relative;
  display: block;
  width: 100%;
  margin: 0;
`;

const StyledDiv = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 12px;
  right: 12px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  pointer-events: none;
`;

const StyledClear = styled.button`
  position: relative;
  outline: none;
  pointer-events: auto;
  background-color: transparent;
  border: 0;
  padding: 0;

  &:focus {
    outline: none;
  }
  cursor: pointer;
`;

SearchBox.defaultProps = {
  placeholder: "Search...",
  roundTopOnly: false
};

export default SearchBox;
