import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import SettingsModal from "./SettingsModal";

const Navbar = ({ user, navButtons }) => {
  const imageRef = useRef(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const profileImg = user.profileImage.url;

  const showSettings = event => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <>
      <NavBarStyle>
        <FlexContainer>
          <a href="https://open.spotify.com/">
            <StyledImg
              src={`${process.env.STATIC_URL}/Spotify_Icon_RGB_Green.png`}
              css={css`
                margin-top: 10px;
              `}
            />
          </a>

          <div
            css={css`
              display: flex;
              flex-direction: column;
              margin-top: 50px;
            `}
          >
            {navButtons.map(btn => (
              <NavLink
                key={btn.path}
                activeStyle={{
                  color: "#ffffff"
                }}
                style={{ color: "#e3e3e3" }}
                exact
                to={btn.path}
              >
                {btn.label}
              </NavLink>
            ))}
          </div>
          {settingsOpen && (
            <SettingsModal
              closeModal={() => setSettingsOpen(false)}
              imageRef={imageRef}
            />
          )}
          <ImgBox>
            <StyledProfileImg
              ref={imageRef}
              src={profileImg}
              onClick={e => {
                showSettings(e);
              }}
            />
          </ImgBox>
        </FlexContainer>
      </NavBarStyle>
    </>
  );
};

export default Navbar;

const NavBarStyle = styled.nav`
  position: fixed;
  height: 100%;
  top: 0;
  bottom: 0;
  background: #2d3436;
  z-index: 1;
`;

const FlexContainer = styled.div`
  flex: 1;
  flex-direction: column;
  width: 7rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;
  justify-content: space-between;
  align-items: center;
`;

const ImgBox = styled.div`
  position: fixed;
  bottom: 15px;
`;

const StyledImg = styled.img`
  width: 4rem;
  height: 4rem;
`;

const StyledProfileImg = styled(StyledImg)`
  border-radius: 50%;
  cursor: pointer;
`;
