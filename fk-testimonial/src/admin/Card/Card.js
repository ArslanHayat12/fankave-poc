import React from "react";
import "./style.css";
import {
  DownloadIcon,
  MenuIcon,
  TickIcon,
  DeleteIcon,
} from "../../assets/index";

export const Card = () => {
  return (
    <section className="testimonial-card-wrapper">
      <article className="card-actions">
        <span className="select-card">
          <TickIcon customClass="tick-icon" />
        </span>
        <MenuIcon />
      </article>
      <img
        className="card-image"
        src="https://homepages.cae.wisc.edu/~ece533/images/frymire.png"
      />
      <article className="user-details">
        <h3 className="name">Sandra Cook</h3>
        <p className="email">jacob.green@mail.com</p>
        <p className="company">Fankave</p>
      </article>
      <article className="details">
        <p className="duration">4 Days Ago</p>
        <span>
          <DownloadIcon customClass="download-icon" />
          <DeleteIcon />
        </span>
      </article>
    </section>
  );
};
