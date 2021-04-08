import styled from "styled-components";
import {
  onSmallPhoneMediaQuery,
  onSmallTabletMediaQuery,
} from "../../utils/responsive";

const Button = styled.button`
  ${onSmallTabletMediaQuery()} {
    font-size: 12px;
  }
  position: relative;
  display: block;
  border-radius: 8px;
  /* color: white; */
  border: none;
  padding: 10px;
  background: linear-gradient(
    to left top,
    rgba(255, 192, 203, 0.9),
    rgba(255, 255, 255, 0.3)
  );
  margin: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export default Button;
