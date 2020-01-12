import { css, Global } from "@emotion/core";

const GlobalStyles = ({ scroll }) => {
  // Declare the dynamic scroll value as a constant to appease css parser.
  const dynamicScroll = scroll ? null : "hidden";

  return (
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap");

        *,
        *::after,
        *::before {
          margin: 0px;
          padding: 0px;
          box-sizing: inherit;
          overflow-y: ${dynamicScroll};
        }

        body {
          box-sizing: border-box;
          font-family: "Montserrat", sans-serif;
        }
      `}
    />
  );
};
export default GlobalStyles;
