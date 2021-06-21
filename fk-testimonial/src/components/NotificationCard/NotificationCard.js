import React from "react";

const NotificationCard = () => {
  return (
    <article className="notificarion-wrapper">
      <p className="description">Allow fankave to use camera and microphone </p>
      <button className="button">Allow</button>
      <button className="button">Dismiss</button>
    </article>
  );
};

export default NotificationCard;
