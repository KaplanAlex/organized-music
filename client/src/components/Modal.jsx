import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import StyleContext from "../context/StyleContext";

const JSX_Modal = ({ open, setClose, children }) => {
  const { toggleScroll } = useContext(StyleContext);
  useEffect(() => {
    toggleScroll(false);

    return () => {
      toggleScroll(true);
    };
  }, []);

  return (
    <ModalWrapper open={open}>
      <ModalStyles>
        <ModalOverflow>
          <h3>Header</h3>
          <button onClick={setClose}>Close</button>
          <div>{children}</div>
          <div>Footer</div>
        </ModalOverflow>
      </ModalStyles>
    </ModalWrapper>
  );
};

const Modal = props => {
  return ReactDOM.createPortal(
    <JSX_Modal {...props} />,
    document.querySelector("#modal")
  );
};

// const ModalWrapper = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background: rgba(0, 0, 0, 0.6);
//   display: ${props => (props.open ? "block" : "none")};
// `;

// const ModalStyles = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   align-items: stretch;
//   justify-content: center;
//   /* height: 50%;
//   width: 50%; */
//   background-color: #ffffff;
// `;

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
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 50%;
  height: 50%;
  /* flex: 1; */
`;

const ModalOverflow = styled.div`
  overflow-y: auto;
`;

export default Modal;
