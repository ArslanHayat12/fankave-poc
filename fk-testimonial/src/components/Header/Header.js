import React from "react";
import { HeaderStyled } from "./style";

const Header = (props) => {
  const { mainLogoSrc, subLogoSrc } = props;
  return (
    <HeaderStyled className="header-wrapper" id="fk-header">
      {mainLogoSrc && <img src={mainLogoSrc} className="main-logo" />}
      {subLogoSrc && <img src={subLogoSrc} className="sub-logo" />}
    </HeaderStyled>
  );
};

export default Header;
