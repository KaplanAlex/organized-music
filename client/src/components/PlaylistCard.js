import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { PlayCircle } from "react-feather";

import Card from "./Card";
import Tag from "./Tag";
import { playSpotifyPlaylist } from "../api/library";

const PlaylistCard = ({ id, name, description, img }) => {
  const [tags, setTags] = useState(["Rap", "Classic", "Vocal"]);
  const clearTag = idx => {
    setTags(tags.filter(t => tags.indexOf(t) !== idx));
  };

  const handlePlayClick = () => {
    playSpotifyPlaylist(id);
  };

  return (
    <StyledCard>
      <StyledFlex>
        <ImageContainer>
          <StyledImage src={img} />
          <ImageOverlay>
            <PlayButton onClick={handlePlayClick}>
              <StyledPlayCircle />
            </PlayButton>
          </ImageOverlay>
        </ImageContainer>
        <StyledText>{name}</StyledText>
        <StyledText
          css={css`
            font-size: 12px;
          `}
        >
          {description}
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

const StyledPlayCircle = styled(PlayCircle)`
  color: white;
  font-size: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 40%;
  width: 40%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;

  &:hover {
    color: #cccccc;
  }
`;

const PlayButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  &:active {
    ${StyledPlayCircle} {
      color: #a3a3a3;
    }
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ImageContainer = styled.div`
  position: relative;
  max-height: 200px;
  max-width: 200px;

  &:hover {
    ${ImageOverlay} {
      opacity: 1;
    }
  }
`;

const StyledImage = styled.img`
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
  height: 55px;
`;

export default PlaylistCard;
