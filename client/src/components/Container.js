import React from "react";
import styled from "@emotion/styled";

/**
 * Container comonent which keeps content centered
 * within the window
 */
const Container = styled.div`
  padding-left: ${props => {
    if (props.full) return 0;
    return "calc((100vw - 960px) / 2)";
  }};

  padding-right: ${props => {
    if (props.full) return 0;
    return "calc((100vw - 960px) / 2)";
  }};
  padding-top: ${props => {
    if (props.fullVertical) return 0;
    if (props.small) return "15px";
    return "4rem";
  }};
  padding-bottom: ${props => {
    if (props.fullVertical) return 0;
    if (props.small) return "15px";
    return "25px";
  }};
`;

export default Container;
