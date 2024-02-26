// SearchBar.jsx
import React, { useState } from 'react';
import styled from 'styled-components';


const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center; 
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #fff; 
  border-radius: 5px;
  color: #fff; 
  background-color: #000; 
  margin-right: 5px; 
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #fff; /* White background color */
  color: #000; /* Black text color */
  font-size: 16px;
  border: 1px solid #000; /* Black border */
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #000; /* Black background color on hover */
    color: #fff; /* White text color on hover */
  }
`;

const SearchBar = ({ onSearch, isVisible }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Form isVisible={isVisible} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search for news..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SubmitButton type="submit">Search</SubmitButton>
    </Form>
  );
};

export default SearchBar;
