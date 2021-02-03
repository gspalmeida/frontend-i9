import React, { FormEvent, useState } from "react";

import { useAuth } from '../../hooks/auth';

import CardForm from "../../components/CardForm";

import { InputBlock, Input } from "./styles";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const history = useHistory();

  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  
  const { signIn } = useAuth();
  
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await signIn({
        email,
        password
      });
      history.push('/');
    } catch (error) {
      console.log(error);
      alert("Não foi possível realizar  o LogIn, entre em contato com o administrador: \n\n Gustavo - (44) 9 9957-1618")
    }
  };
  return (
    <CardForm
      title="Entrar"
      subtitle="Você não tem uma conta?"
      subtitleLink="Cadastre-se"
      subtitleLinkHref="/cadastrar"
      buttonTitle="Entrar"
      onSubmit={handleSubmit}
    >
      <InputBlock>
        <Input
          required
          placeholder="Email"
          value={email}
          onChange={(e) => {
            SetEmail(e.target.value);
          }}
        />
        <Input
          required
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => {
            SetPassword(e.target.value);
          }}
        />
      </InputBlock>
    </CardForm>
  );
};

export default Login;
