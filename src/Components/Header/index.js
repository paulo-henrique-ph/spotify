import React from 'react';
import { Container, Search, User } from './styles';

const Header = () => (
  <Container>
    <Search>
      <input placeholder="Search" />
    </Search>

    <User>
      <img src="https://avatars1.githubusercontent.com/u/42645554?s=460&v=4" alt="Avatar" />
      Paulo Henrique
    </User>
  </Container>
);

export default Header;
