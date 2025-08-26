import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: ${(props) => props.theme.fonts.body};
    background-color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.background : props.theme.colors.light.background)};
    color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
    transition: background-color ${(props) => props.theme.transitions.normal}, color ${(props) => props.theme.transitions.normal};
  }

  #root {
    height: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
    transition: all ${(props) => props.theme.transitions.fast};
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
    transition: all ${(props) => props.theme.transitions.fast};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.supportive.coolGray};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.primary.deepBlue};
  }
`

export default GlobalStyles
