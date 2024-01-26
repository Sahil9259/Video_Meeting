import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NavbarWrapper = styled.div`
  background-color: #202124;
  color: #fff;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const UserIcons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  @media (max-width: 650px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const UserIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 0.5rem;

  @media (max-width: 650px) {
    margin-bottom: 0.5rem;
    margin-right: 0;
  }
`;

const DateTime = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-right: 1rem;

  @media (max-width: 650px) {
    margin-right: 0;
  }
`;

const Navbar = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDateTime = dateTime.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <NavbarWrapper>
      <Logo>Meet</Logo>

      <UserIcons>
        <DateTime>{formattedDateTime}</DateTime>
        <UserIcon src="https://via.placeholder.com/30" alt="User 1" />
        <UserIcon src="https://via.placeholder.com/30" alt="User 2" />
      </UserIcons>
    </NavbarWrapper>
  );
};

export default Navbar;
