import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const Navbar = ({ user }) => {
  const profileImg = user.profileImage.url;

  return (
    <>
      <NavBarStyle>
        <FlexContainer>
          <span
            css={css`
              color: #ffffff;
            `}
          >
            Lets start tagging!
          </span>

          <ImgBox>
            <StyledImg src={profileImg} />
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
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
`;
