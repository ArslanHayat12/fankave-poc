import React from "react";
import { PencilIcon } from "../../assets";
import './style.css'

const ClientDetails = () => {
  return (
    <article className='client-details-wrapper'>
      <article className='client-name-wrapper'>
        <h3 className="client-name">Brandy Estrada</h3>
        <span><PencilIcon/></span>
      </article>
      <p className='client-details'>brandy.estrada@mail.com</p>
      <p className='client-details'>XYZ Corporation</p>
    </article>
  );
};

export default ClientDetails