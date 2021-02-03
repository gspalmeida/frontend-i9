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

interface ParsedUserProps {
  avatar: string|undefined;
  name: string;
}


const Header: React.FC = () => {
  let parsedUser: ParsedUserProps = {avatar:'', name:'Saindo...'};
  const history = useHistory();
  
  const { signOut, admin, provider } = useAuth();

  if (admin){
    parsedUser = {avatar: admin.avatar, name: admin.name};
  }
  if(provider){
    parsedUser = {avatar: provider.avatar, name: provider.name};
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
          <Avatar src={'http://localhost:3333/files/'+parsedUser.avatar} />
          <Username>{parsedUser.name}</Username>
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
