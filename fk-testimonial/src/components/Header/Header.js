import React from "react";
import { HeaderStyled } from "./style";

const Header = () => {
  return (
    <HeaderStyled className="header-wrapper" id="fk-header">
      <img src="http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/img/start.png" />
    </HeaderStyled>
  );
};

export default Header;
