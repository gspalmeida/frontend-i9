import React from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Wrapper,
  Left,
  Right,
  Avatar,
  Username,
  Button,
  ButtonSm,
  Brand,
} from "./styles";

const Header: React.FC = () => {
  let parsedProvider = {avatar:'', name:'Saindo...'};
  const history = useHistory();
  
  const { signOut } = useAuth();
  const provider = localStorage.getItem('@i9:provider');
  console.log(provider);
  if (provider){
    parsedProvider = JSON.parse(provider);
    console.log(parsedProvider);
  }
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
          <Avatar src={'http://localhost:3333/files/'+parsedProvider.avatar} />
          <Username>{parsedProvider.name}</Username>
          <ButtonSm outlined color="#ffffff" onClick={() => {
            history.push('/');
            signOut()}}> 
            Sair
          </ButtonSm>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
