import React from "react";
import "./PricingCard.css";
import { Link } from "react-router-dom";
const PricingCard = ({ title, price, articles, users, commentSection }) => {
  const handleReadMoreClick = () => {
    window.location.href = externalLink; }
  return (
    <div className="PricingCard">
      <header>
        <p className="card-title">{title}</p>
        <h1 className="card-price">{price}</h1>
      </header>
      {/* features here */}
      <div className="card-features">
        <div className="card-articles">{articles}</div>
        <div className="card-users-allowed">{users} users features</div>
        <div className="card-comment-section">Interact through{commentSection}</div>
      </div>
      <button className="card-btn" onClick={handleReadMoreClick}>
        READ MORE
      </button>
    </div>
  );
};

export default PricingCard;