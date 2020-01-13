import React, { useEffect, useContext, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import StyleContext from "../context/StyleContext";

const JSX_Modal = ({ open, closeModal, children }) => {
  // Access global scroll setting.
  const { toggleScroll } = useContext(StyleContext);

  // Detect clicks outside of the modal
  const contentRef = useRef(null);
  const handleClickOutside = event => {
    if (contentRef.current && !contentRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    toggleScroll(false);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      toggleScroll(true);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ModalWrapper open={open}>
      <ModalStyles ref={contentRef}>
        <ModalOverflow>{children}</ModalOverflow>
      </ModalStyles>
    </ModalWrapper>
  );
};

// Create a portal to the div next to the current react app.
const Modal = props => {
  return ReactDOM.createPortal(
    <JSX_Modal {...props} />,
    document.querySelector("#modal")
  );
};

const ModalWrapper = styled.div`
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;

  justify-content: center;
  align-items: center;
  min-height: 100%;
  z-index: 2;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ModalStyles = styled.div`
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 50%;
  height: 50%;
  border-radius: 5px;
`;

const ModalOverflow = styled.div`
  overflow-y: auto;
  padding: 10px;
`;

export default Modal;
