import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import Card from "./Card";
import Flex from "./Flex";

const StyledImage = styled.div`
  max-height: 200px;
  max-width: 200px;
  /* box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2); */
`;

const StyledImageNoDrag = styled.img`
  max-height: 200px;
  max-width: 200px;

  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  &:hover {
    color: #e6e6e6;
  }
`;

const StyledCard = styled(Card)`
  background-color: #ffffff;
`;

const StyledFlex = styled(Flex)`
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
`;

const StyledText = styled.div`
  max-height: 200px;
  max-width: 200px;

  display: flex;
  padding-top: 10px;
  justify-content: flex-start;
`;

const PlaylistCard = () => {
  return (
    <StyledCard>
      <StyledFlex>
        <StyledImage>
          <StyledImageNoDrag src={"../static/Section.80.jpeg"} />
        </StyledImage>
        <StyledText>Liked from radio</StyledText>
        <StyledText
          css={css`
            font-size: 12px;
          `}
        >
          This is the information about the playlist that is displayed
        </StyledText>
      </StyledFlex>
    </StyledCard>
  );
};

export default PlaylistCard;
