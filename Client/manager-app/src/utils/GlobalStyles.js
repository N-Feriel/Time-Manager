import { createGlobalStyle } from "styled-components";

export const themeVars = {
  lavender: "#D8E7FD",
  PolishedPineColor: "#70A288",
  BurlywoodColor: "#DAB785",
  middleRedColor: "#D5896F",
  darkBlue: "#042B51",
  green: "rgba(167, 194, 202, 0.5)",
  pink: "#F6C4C4",
  red: "#D13A3A",
  grey: "#E1DEDE",
  darkPink: "#AC8787",
  lightPink: "#FBEBEB",
  violet: "#6167A0",

  // darkGreen: "#07617D",
  secondGreen: "rgba(167, 194, 202, 0.5)",
  // lightBlack: "rgba(46, 56, 63, 0.93)",
  // lightBlue: "rgba(7, 13, 89, 0.33)",
  // darkColor: "#2E383F",
};

export default createGlobalStyle`
html,
body{
    padding: 0;
    margin: 0;
    height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    /* display: grid; */
    //place-content: center;
    scroll-behavior: smooth;
    overflow: hidden; 
    }

* {
    box-sizing: border-box;
    }

#root{
    min-height: 100vh;
    max-height: 100%;
    background: linear-gradient(to right top, #F6C4C4, #6167A0) ;
    display: flex;
    flex-direction: column;

}


& h2{
    text-align: center;
    font-size: 1.5rem;
    margin: 2rem;
    color: ${themeVars.darkBlue};
    opacity: 0.8;
}

main {
    padding: 5rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    }

code {
    background: #fafafa;
    border-radius: 5px;
    padding: 0.75rem;
    font-family: Menlo, Monaco, Lucida Console, Courier New, monospace;
    }



.container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    }

ol, ul {
    list-style: none;
    margin: 0;
    padding: 0;
    
    }

`;
