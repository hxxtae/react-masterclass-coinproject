import Router from './Router';
import { darkTheme, lightTheme } from './theme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';

const GlobalStyle = createGlobalStyle` // createGlobalStyle API

  // 가능한 링크(import url())는 public/index.html 안에 선언해 준다.
  
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  
  /* make sure to set some focus styles for accessibility */
  :focus {
      outline: 0;
  }
  
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  * {
    box-sizing: border-box;
  }
  
  body {
    font-weight: 300;
    line-height: 1;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props => props.theme.textColor)};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  
  ol, ul {
    list-style: none;
  }
  
  blockquote, q {
    quotes: none;
  }
  
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  input[type=search]::-webkit-search-cancel-button,
  input[type=search]::-webkit-search-decoration,
  input[type=search]::-webkit-search-results-button,
  input[type=search]::-webkit-search-results-decoration {
      -webkit-appearance: none;
      -moz-appearance: none;
  }
  
  input[type=search] {
      -webkit-appearance: none;
      -moz-appearance: none;
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
  }
  
  textarea {
      overflow: auto;
      vertical-align: top;
      resize: vertical;
  }
  
  audio,
  canvas,
  video {
      display: inline-block;
      *display: inline;
      *zoom: 1;
      max-width: 100%;
  }
  
  audio:not([controls]) {
      display: none;
      height: 0;
  }
  
  [hidden] {
      display: none;
  }
  
  html {
      font-size: 100%; /* 1 */
      -webkit-text-size-adjust: 100%; /* 2 */
      -ms-text-size-adjust: 100%; /* 2 */
  }
  
  a:focus {
      outline: thin dotted;
  }
  
  a:active,
  a:hover {
      outline: 0;
  }
  
  img {
      border: 0; /* 1 */
      -ms-interpolation-mode: bicubic; /* 2 */
  }
  
  figure {
      margin: 0;
  }
  
  form {
      margin: 0;
  }
  
  fieldset {
      border: 1px solid #c0c0c0;
      margin: 0 2px;
      padding: 0.35em 0.625em 0.75em;
  }
  
  legend {
      border: 0; /* 1 */
      padding: 0;
      white-space: normal; /* 2 */
      *margin-left: -7px; /* 3 */
  }
  
  button,
  input,
  select,
  textarea {
      font-size: 100%; /* 1 */
      margin: 0; /* 2 */
      vertical-align: baseline; /* 3 */
      *vertical-align: middle; /* 3 */
  }
  
  button,
  input {
      line-height: normal;
  }
  
  button,
  select {
      text-transform: none;
  }
  
  button,
  html input[type="button"], /* 1 */
  input[type="reset"],
  input[type="submit"] {
      -webkit-appearance: button; /* 2 */
      cursor: pointer; /* 3 */
      *overflow: visible;  /* 4 */
  }
  
  button[disabled],
  html input[disabled] {
      cursor: default;
  }
  
  input[type="checkbox"],
  input[type="radio"] {
      box-sizing: border-box; /* 1 */
      padding: 0; /* 2 */
      *height: 13px; /* 3 */
      *width: 13px; /* 3 */
  }
  
  input[type="search"] {
      -webkit-appearance: textfield; /* 1 */
      -moz-box-sizing: content-box;
      -webkit-box-sizing: content-box; /* 2 */
      box-sizing: content-box;
  }
  
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
  }
  
  /**
   * Remove inner padding and border in Firefox 3+.
   */
  
  button::-moz-focus-inner,
  input::-moz-focus-inner {
      border: 0;
      padding: 0;
  }
  
  /**
   * 1. Remove default vertical scrollbar in IE 6/7/8/9.
   * 2. Improve readability and alignment in all browsers.
   */
  
  textarea {
      overflow: auto; /* 1 */
      vertical-align: top; /* 2 */
  }
  
  /**
   * Remove most spacing between table cells.
   */
  
  table {
      border-collapse: collapse;
      border-spacing: 0;
  }
  
  html,
  button,
  input,
  select,
  textarea {
      color: #222;
  }
  
  
  ::-moz-selection {
      background: #b3d4fc;
      text-shadow: none;
  }
  
  ::selection {
      background: #b3d4fc;
      text-shadow: none;
  }
  
  img {
      vertical-align: middle;
  }
  
  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }
  
  textarea {
      resize: vertical;
  }
  
  .chromeframe {
    margin: 0.2em 0;
    background: #ccc;
    color: #000;
    padding: 0.2em 0;
  }
`;



function App() {
  const isDark = useRecoilValue(isDarkAtom);
  
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
}

export default App;

// [ React Fragment ]
// 두 개 이상의 컴포넌트를 담기 위해, 의미없는 <div></div>를 사용하지말고
// Fragment '<></>' 를 사용하자.

// [ createGlobalStyle ]
// 전역 스타일을 처리하는 특수 StyledComponent를 생성하는 도우미 함수입니다.
// 일반적으로 스타일이 지정된 구성 요소(컴포넌트)는 자동으로 로컬 CSS 클래스로 범위가 지정되므로 다른 구성 요소(컴포넌트)와 격리됩니다.

