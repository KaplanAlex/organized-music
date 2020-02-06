import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { logout } from "../api/user";

const SettingsModal = ({ closeModal, imageRef }) => {
  // Detect clicks outside the modal (and outside the profile image) to dismiss
  // Clicks to the profile image will dimiss the modal on their own. Dismissing here
  // leads to a race.
  const modalRef = useRef(null);
  const manageClick = event => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      !imageRef.current.contains(event.target)
    ) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", manageClick);
    return () => {
      document.removeEventListener("mousedown", manageClick);
    };
  }, []);

  const handleLogout = () => {
    var x = document.cookie;
    console.log(x);
    logout();
  };

  return (
    <SettingsContainer ref={modalRef}>
      <span>Settings</span>
      <StyledButton onClick={handleLogout}>Logout</StyledButton>
    </SettingsContainer>
  );
};

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 5px;

  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 85px;
`;

const StyledButton = styled.button`
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export default SettingsModal;
