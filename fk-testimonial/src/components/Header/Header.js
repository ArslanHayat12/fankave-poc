import React from "react";
import { HeaderStyled } from "./style";

const Header = (props) => {
  const { src } = props;
  return (
    <HeaderStyled className="header-wrapper" id="fk-header">
      {src && <img src={src} />}
    </HeaderStyled>
  );
};

export default Header;
