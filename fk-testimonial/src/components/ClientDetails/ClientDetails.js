import React from "react";
import { PencilIcon } from "../../assets";
import { getQueryStringValue } from "../../utils/";
import "./style.css";

const ClientDetails = () => {
  const name = getQueryStringValue("name");
  const email = getQueryStringValue("email");
  const companyName = getQueryStringValue("company");
  return (
    <article className="client-details-wrapper">
      <article className="client-name-wrapper">
        <h3 className="client-name">{name || "Brandy Estrada"}</h3>
        <span><PencilIcon/></span>
      </article>
      <p className="client-details">{email || "brandy.estrada@mail.com"}</p>
      <p className="client-details">{companyName || "XYZ Corporation"}</p>
    </article>
  );
};

export default ClientDetails;
