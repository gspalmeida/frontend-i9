import React, { FormEvent, useState } from "react";

import api from '../../services/api';
import { useHistory } from "react-router-dom";


import CardForm from "../../components/CardForm";
import AvatarImage from "../../assets/user.png";

import {
  InputBlock,
  UploadContainer,
  UploadImage,
  PreviewImage,
  UploadText,
  Input,
} from "./styles";

const Register: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState<File | string>("");
  const [avatarUrl, setAvatarUrl] = useState(AvatarImage);

  const handleChange = (files: FileList | null) => {
    if (files) {
      setAvatar(files[0]);
      setAvatarUrl(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      const data = new FormData();

      data.append("name", name);
      data.append("email", email);
      data.append("password", password);

      data.append("avatar", avatar);

      await api.post('/providers', data);

      alert("Sua conta foi criada, aguarde aprovação do administrador para realizar logIn");
      

      history.push('/');

    };

  return (
    <CardForm
      title="Criar conta"
      subtitle="Você já tem uma conta?"
      subtitleLink="Entrar"
      subtitleLinkHref="/"
      buttonTitle="Registrar"
      onSubmit={handleSubmit}
    >
      <InputBlock>
        <UploadContainer>
          <UploadImage htmlFor="upload" />
          <PreviewImage src={avatarUrl} />
        </UploadContainer>
        <UploadText>Clique para alterar seu avatar</UploadText>
        <input
          id="upload"
          type="file"
          onChange={(e) => handleChange(e.target.files)}
          style={{ opacity: 0 }}
        />

        <Input
          required
          autoCapitalize="words"
          placeholder="Nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <Input
          required
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          required
          type = "password"
          placeholder="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </InputBlock>
    </CardForm>
  );
};

export default Register;
