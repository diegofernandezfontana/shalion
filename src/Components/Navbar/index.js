import React from 'react';
import { Link } from '@reach/router';

import { NavbarContainer, Wrapper, LinksWrapper, Item } from './styles';

const MainNavbar = () => {
  return (
    <NavbarContainer>
      <Wrapper>
        <img src="https://www.shalion.com/images/shalion_isologo.png"></img>
        <LinksWrapper>
          <Link to="/plot">
            <Item>Plot</Item>
          </Link>
          <Link to="/table">
            <Item>Table</Item>
          </Link>
        </LinksWrapper>
      </Wrapper>
    </NavbarContainer>
  );
};

export default MainNavbar;
