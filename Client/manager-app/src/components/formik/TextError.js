import React from "react";
import styled from "styled-components";
import { themeVars } from "../../utils/GlobalStyles";

function TextError(props) {
  return <Container>{props.children}</Container>;
}

const Container = styled.div`
  display: flex;
  width: 90%;
  color: red;
`;

export default TextError;
