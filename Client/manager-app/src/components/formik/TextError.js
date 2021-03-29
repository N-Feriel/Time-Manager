import React from "react";
import styled from "styled-components";
import { themeVars } from "../../utils/GlobalStyles";

function TextError(props) {
  return <Container>{props.children}</Container>;
}

const Container = styled.div`
  color: ${themeVars.middleRedColor};
`;

export default TextError;
