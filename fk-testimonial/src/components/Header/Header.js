import React from "react";
import { HeaderStyled } from "./style";

const Header = (props) => {
  const { mainLogoSrc, subLogoSrc, subLogoText } = props;
  return (
    <HeaderStyled className="header-wrapper" id="fk-header">
      {mainLogoSrc && <img src={mainLogoSrc} className="main-logo" />}
      {subLogoSrc && <img src={subLogoSrc} className="sub-logo" />}
      {subLogoText && <p className="sub-text">{subLogoText}</p>}
    </HeaderStyled>
  );
};

export default Header;
