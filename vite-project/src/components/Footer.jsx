import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #202124;
  color: #fff;
  padding: 1rem;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      &copy; 2024 Your Company | All rights reserved
    </FooterWrapper>
  );
};

export default Footer;
