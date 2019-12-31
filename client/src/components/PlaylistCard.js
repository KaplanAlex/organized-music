import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import Card from "./Card";
import Tag from "./Tag";

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
  margin-right: 15px;
  margin-bottom: 15px;
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
`;

const StyledText = styled.div`
  max-height: 200px;
  max-width: 200px;

  display: flex;
  padding-top: 10px;
  justify-content: flex-start;
`;

const TagDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 10px;
  max-width: 200px;
`;

const PlaylistCard = () => {
  const [tags, setTags] = useState(["Rap", "Classic", "Vocal"]);
  const clearTag = idx => {
    setTags(tags.filter(t => tags.indexOf(t) !== idx));
  };
  return (
    <StyledCard>
      <StyledFlex>
        <StyledImage>
          <StyledImageNoDrag src={"../../static/Section.80.jpeg"} />
        </StyledImage>
        <StyledText>Liked from radio</StyledText>
        <StyledText
          css={css`
            font-size: 12px;
          `}
        >
          This is the information about the playlist that is displayed
        </StyledText>
        <TagDiv>
          {tags.map((tag, index) => (
            <Tag key={index} value={tag} onClear={() => clearTag(index)} />
          ))}
        </TagDiv>
      </StyledFlex>
    </StyledCard>
  );
};

export default PlaylistCard;
