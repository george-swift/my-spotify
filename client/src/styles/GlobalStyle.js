import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const { colors, fonts, fontSizes, transition } = theme;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 400;
    src: local('Circular Std Book'),
    url('../fonts/CircularStd-Book.woff') format('woff');
  }

  @font-face {
    font-family: 'Circular Std';
    font-style: italic;
    font-weight: 400;
    src: local('Circular Std Book Italic'),
    url('../fonts/CircularStd-BookItalic.woff') format('woff');
  }

  @font-face {
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 500;
    src: local('Circular Std Medium'),
    url('../fonts/CircularStd-Medium.woff') format('woff');
  }

  @font-face {
    font-family: 'Circular Std';
    font-style: italic;
    font-weight: 500;
    src: local('Circular Std Medium Italic'),
    url('../fonts/CircularStd-MediumItalic.woff') format('woff');
  }

  @font-face {
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 700;
    src: local('Circular Std Bold'),
    url('../fonts/CircularStd-Bold.woff') format('woff');
  }
  
  @font-face {
    font-family: 'Circular Std';
    font-style: italic;
    font-weight: 700;
    src: local('Circular Std Bold Italic'),
    url('../fonts/CircularStd-BoldItalic.woff') format('woff');
  }
  
  @font-face {
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 900;
    src: local('Circular Std Black'),
    url('../fonts/CircularStd-Black.woff') format('woff');
  }
  
  @font-face {
    font-family: 'Circular Std';
    font-style: italic;
    font-weight: 900;
    src: local('Circular Std Black Italic'),
    url('../fonts/CircularStd-BlackItalic.woff') format('woff');
  }

  html { box-sizing: border-box; }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
  }

  #root, body { min-height: 100%; }

  body {
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: ${fonts.primary};
    font-size: ${fontSizes.base};
    background-color: ${colors.black};
    color: ${colors.white};
  }

  h1, h2, h3, h4, h5, h6 {
    letter-spacing: -.025em;
    margin: 0 0 10px;
    font-weight: 700;
  }

  h1, h2, h3 { font-weight: 900; }

  p { margin: 0 0 10px; }

  ol, ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    transition: ${transition};
    cursor: pointer;
  }

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    fill: currentColor;
    vertical-align: middle;
  }

  input {
    border-radius: 0;
    outline: 0;

    &::placeholder {
      opacity: 0.7;
    }

    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  button {
    display: inline-block;
    color: ${colors.lightestGrey};
    font-family: ${fonts.primary};
    font-size: ${fontSizes.base};
    font-weight: 700;
    border-radius: 50px;
    border: 0;
    padding: 10px 20px;
    cursor: pointer;
    transition: ${transition};

    &:hover,
    &:focus {
      color: ${colors.white};
      outline: 0;
    }
  }
`;

export default GlobalStyle;
