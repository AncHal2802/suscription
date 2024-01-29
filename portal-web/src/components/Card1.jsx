
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  margin-top: 6rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 300px;
  height: 400px;
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 20px;
  text-align: center;
`;

const StyledButton = styled.a`
  display: inline-block;
  background-color: #2ecc71;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #27ae60;
  }
`;

const Card1 = (data) => {
 
  return (
    <>
      <Navbar />
      <Container>
        <CardContainer>
            <a key={index} href={data.url} target="_blank" rel="noopener noreferrer">
              <Card>
                <CardImage src={data.urlToImage} alt="News" />
                <CardBody>
                  <h5>{data.title}</h5>
                  <p>{data.description}</p>
                  <Link to={{ pathname: "/newsDetails", state: { articleData: value } }}>
                  <StyledButton target="_blank" rel="noopener noreferrer">
                    Read More
                  </StyledButton>
                </Link>
                </CardBody>
              </Card>
            </a>
          
        </CardContainer>
      </Container>
    </>
  );
};

export default Card1;
