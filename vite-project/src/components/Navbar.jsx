import React  from "react";
import styled from "styled-components";
import {  NavLink } from "react-router-dom";

const NavbarWrapper = styled.div`
  background-color: #202124;
  color: #fff;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Logo = styled.h3`
  margin: 0;
`;

const UserIcons = styled.div`
  display: flex;
  align-items: center;

  a {
    display: block;
    margin: 10px 10px;
    padding: 8px 10px;
    background-color: #fff;
    color: #202124;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #202124;
      color: #fff;
    }
  }
`;

const UserIcon = styled.h5`
  width: 100%;
  
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Logo>Video Call</Logo>
      <UserIcons>
        <NavLink to='/createmeet'>Create Meeting</NavLink>
        <NavLink to='/joinmeet'>Join Meeting</NavLink>
      </UserIcons>
    </NavbarWrapper>
  );
};

export default Navbar;
