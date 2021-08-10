import React from "react";
import "./style.js";
import { FooterStyled } from "./style.js";

const Footer = (props) => {
  const { src } = props;
  return (
    <FooterStyled className="footer-wrapper" id="fk-footer">
      {src && <img src={src} />}
    </FooterStyled>
  );
};

export default Footer;
