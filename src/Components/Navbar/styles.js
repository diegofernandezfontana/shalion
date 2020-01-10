import styled from 'styled-components';
import { rem } from 'polished';

const navbar = {
  height: rem(75),
  padding: rem(10),
};

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #e0e0e0;
  padding: ${navbar.padding} 0;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${navbar.height};
  width: 1400px;

  img {
    max-height: 100%;
  }
`;

export const LinksWrapper = styled.div`
  text-decoration: none;
  display: flex;
`;

export const Item = styled.h1`
  font-size: 1.4rem;
  color: #3a51a4;
  text-decoration: none;
  padding: 15px;
  text-decoration: underline;
`;
