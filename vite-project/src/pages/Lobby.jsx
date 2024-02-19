import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import icon from '../assets/meet.jpg';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin-top: 7rem;
  text-align: center;

  @media screen and (max-width: 750px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  width: 50%;

  img {
    width: 80%;
    height: 100%;
    border-radius: 8px;
  }
`;

const FormContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;

  a {
    display: block;
    margin: 10px 20px;
    padding: 8px 10px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
  @media screen and (max-width: 750px) {
    flex-direction: column;
  }
`;

const Lobby = () => {
  return (
    <Container>
      <ImageContainer>
        <img src={icon} alt="Meeting Icon" />
      </ImageContainer>
      <FormContainer>
        
        <Link to='/createmeet'>Create Meeting</Link>
        <Link to='/joinmeet'>Join Meeting</Link>
      </FormContainer>
    </Container>
  );
};

export default Lobby;
