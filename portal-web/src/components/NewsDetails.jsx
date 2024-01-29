import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NewsDetails.css'

const NewsDetails = () => {
  const { index, title, urlToImage } = useParams();

  return (
    <div className='Info'>
      <h1>News Details</h1>
      <p>Article Index: {index}</p>
      <p>Article Title: {title}</p>
      <img src={urlToImage}/>
    </div>
  );
};

export default NewsDetails;
