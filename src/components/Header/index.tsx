import React from "react";

import {
  Container,
  Wrapper,
  Left,
  NewServiceLink,
  Right,
  Avatar,
  Username,
} from "./styles";

const Header: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <h1>Logo</h1>
          <NewServiceLink to="/criarservico">Criar serviço</NewServiceLink>
        </Left>
        <Right>
          <Avatar src={process.env.REACT_APP_SERVER_STATIC_URL} />
          <Username>HeitorMaf</Username>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
