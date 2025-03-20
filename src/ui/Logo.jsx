import styled, { css } from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

//= Sizes ==============================
const sizes = {
  regular: css`
    height: 13rem;
  `,
  large: css`
    height: 30rem;
  `,
};

//= Styled Components ==================
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: auto;
  ${(props) => sizes[props.size]}
`;

//= Component ==========================
function Logo({ size = "regular" }) {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" size={size} />
    </StyledLogo>
  );
}

export default Logo;
