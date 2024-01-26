import React from 'react';
import styled from 'styled-components';

const Card1 = () => {
  return (
    <Card> <div className="card text-bg-dark">
      <img src="your-image-source.jpg" className="card-img" alt="Card" />
      <div className="card-img-overlay">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          This is a wider card with supporting text below as a natural lead-in to additional content.
          This content is a little bit longer.
        </p>
        <p className="card-text">
          <small>Last updated 3 mins ago</small>
        </p>
      </div>
    </div>
    </Card>
   
  );
};

export default Card1;

const Card = styled.div`
  position: relative;
  display: inline-block;
  width: 80%px; /* Set the desired width for your card */
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
`;

const CardImg = styled.img`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ccc;
`;

const CardOverlay = styled.div`
  padding: 15px;
`;

const CardTitle = styled.h5`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 1rem;
  margin-bottom: 15px;
`;

const SmallText = styled.small`
  font-size: 0.8rem;
  color: #777;
`;
