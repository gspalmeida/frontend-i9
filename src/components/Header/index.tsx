import React from "react";
import { useHistory } from "react-router-dom";

import {
  Container,
  Wrapper,
  Left,
  NewServiceLink,
  Right,
  Avatar,
  Username,
  Button,
  Brand,
} from "./styles";

const Header: React.FC = () => {
  const history = useHistory();
  return (
    <Container>
      <Wrapper>
        <Left>
          <Brand>SetNinjas</Brand>
          <Button color="#2dab03" onClick={()=>{history.push('/criarservico')}}>
          Criar Serviço
        </Button>
          {/* <NewServiceLink to="/criarservico">Criar serviço</NewServiceLink> */}
        </Left>
        <Right>
          <Avatar src={process.env.REACT_APP_SERVER_STATIC_URL} />
          <Username>Username</Username>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
