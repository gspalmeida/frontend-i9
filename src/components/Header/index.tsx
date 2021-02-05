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
  
  const { signOut } = useAuth();
  const admin = localStorage.getItem('@i9:admin');
  const provider = localStorage.getItem('@i9:provider');
  console.log(!!admin);
  console.log(!!provider);
  

  if (admin !== 'undefined' && admin ){
    const parsedAdmin = JSON.parse(admin);
    parsedUser = {avatar: parsedAdmin.avatar, name: parsedAdmin.name};
  }
  if(provider !== 'undefined' && provider){
    const parsedProvider = JSON.parse(provider);
    parsedUser = {avatar: parsedProvider.avatar, name: parsedProvider.name};
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Brand>SetNinjas</Brand>
          {provider!=='undefined' && 
            <Button color="#2dab03" onClick={()=>{history.push('/criarservico')}}>
              Criar Serviço
            </Button>
          }
          {admin!=='undefined' &&  
            <Button color="#9c9f13" onClick={()=>{history.push('/createServiceType')}}>
              Criar Tipo de Serviço
            </Button>
          }
        </Left>
        <Right>
          <Avatar src={'https://provai9.cuideme.care:1919/files/'+parsedUser.avatar} />
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
