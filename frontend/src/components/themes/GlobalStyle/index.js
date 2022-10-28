import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${({ theme: {
      colors: { background },
      },
    }) => background.white}; 
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
  }
`;

export default GlobalStyle;