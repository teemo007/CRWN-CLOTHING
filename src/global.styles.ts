import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
    box-sizing: border-box;
    }
    body {
    margin: 0;
    font-family: "Ubuntu Condensed", sans-serif;
    padding: max(3vh, 1.25rem) 2.5rem;
    //font-family: 'Open Sans Condensed', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }
    code {
    font-family: source-code-pro, Monaco, Consolas, "Courier New", Monospace;
    }

    a {
    text-decoration: none;
    color: black;
    }
`;
