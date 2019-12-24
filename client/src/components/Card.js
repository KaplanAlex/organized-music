import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const animatedCss = css`
  opacity: 1;
  transform: translateY(0);
`;

const primaryCss = css`
  background-color: #008bf8;
  color: #fff;
`;

const StyledCard = styled.div`
  /* width: ${props => (props.big ? "450px" : "300px")}; */
  min-width: 200px;
  padding: 15px;
  opacity: 0;
  transform: translateY(50px);
  transition: 500ms all ease-in-out;
  margin: ${props => (props.noMargin ? 0 : "15px")};
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  ${props => props.animated && animatedCss}
  ${props => props.primary && primaryCss}

  &:hover {
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 1);
  }
`;

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animated: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => {
        return { animated: true };
      });
    }, this.props.delay);
  }

  render() {
    const {
      delay = 0,
      noAnimation,
      primary,
      noMargin,
      big,
      ...props
    } = this.props;
    return (
      <StyledCard
        animated={this.state.animated}
        delay={delay}
        primary={primary}
        noAnimation={noAnimation}
        big={big}
        noMargin={noMargin}
        {...props}
      />
    );
  }
}

export default Card;
