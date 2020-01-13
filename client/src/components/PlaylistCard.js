import React, { useState } from "react";
import styled from "@emotion/styled";
import { PlayCircle, PlusCircle } from "react-feather";

import Card from "./Card";
import Tag from "./Tag";
import PlaylistDetailModal from "./PlaylistDetailModal";
import { playSpotifyPlaylist } from "../api/spotify";

const PlaylistCard = ({ id, name, description, img }) => {
  const [tags, setTags] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const filteredName = name || "No Name";
  const filteredDescription = description || "No description";

  const clearTag = idx => {
    setTags(tags.filter(t => tags.indexOf(t) !== idx));
  };

  const handlePlayClick = () => {
    playSpotifyPlaylist(id);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const PlayableImage = (
    <ImageContainer>
      <StyledImage src={img} />
      <ImageOverlay>
        <PlayButton onClick={handlePlayClick}>
          <StyledPlayCircle />
        </PlayButton>
      </ImageOverlay>
    </ImageContainer>
  );

  return (
    <StyledCard>
      <StyledFlex>
        {PlayableImage}
        <StyledText>
          <StyledTitle>{filteredName}</StyledTitle>
          <StyledDescription>{filteredDescription}</StyledDescription>
        </StyledText>
        <TagDiv>
          {!!tags && "Add a tag to start organizing!"}
          {tags.map((tag, index) => (
            <Tag key={index} value={tag} onClear={() => clearTag(index)} />
          ))}
          <PlusButton onClick={openModal}>
            <StyledPlusCircle />
          </PlusButton>
        </TagDiv>
      </StyledFlex>
      {modalOpen && (
        <PlaylistDetailModal
          open={modalOpen}
          closeModal={closeModal}
          playableImage={PlayableImage}
          tags={tags}
        />
      )}
    </StyledCard>
  );
};

const StyledPlayCircle = styled(PlayCircle)`
  color: #cccccc;
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
    color: #ffffff;
    height: 45%;
    width: 45%;
  }
`;

const StyledPlusCircle = styled(PlusCircle)`
  &:hover {
    /* color: #333333; */
    color: #5c5c5c;
  }
`;

const InvisibleButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const PlayButton = styled(InvisibleButton)`
  &:active {
    ${StyledPlayCircle} {
      color: #a3a3a3;
    }
  }
`;

const PlusButton = styled(InvisibleButton)`
  &:active {
    ${StyledPlusCircle} {
      color: #7d7d7d;
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
  display: flex;
  position: relative;
  height: 200px;
  width: 200px;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  &:hover {
    ${ImageOverlay} {
      opacity: 1;
    }
  }

  /* Disk Background image */
  background-image: url("../../static/empty_disk.png");
  /* display: inline-block; */ /* Removes the border */
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const StyledImage = styled.img`
  flex: 1;
  height: 100%;
  width: auto;
  object-fit: cover;
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
  min-height: 74px;
  max-height: 200px;
  max-width: 200px;

  display: flex;
  flex-direction: column;
  padding-top: 10px;
  justify-content: flex-start;

  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledTitle = styled.div`
  display: -webkit-box;
  white-space: nowrap;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const StyledDescription = styled.div`
  font-size: 12px;
  line-height: 18px;

  white-space: nowrap;
  color: #b3b3b3;
  padding: 0;
  margin-top: 4px;
  white-space: normal;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const TagDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 10px;
  max-width: 200px;
  height: 55px;
  overflow: hidden;
  font-size: 12px;
`;

export default PlaylistCard;
