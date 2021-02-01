import React from "react";

import { Container, Wrapper, Left, Right } from "./styles";

const Header: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Left></Left>
        <Right></Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
