import React, { FormEvent, useState } from "react";
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
import DatePicker from "../../components/DatePicker";

const Register: React.FC = () => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const [avatar, SetAvatar] = useState<File | string>("");
  const [avatarUrl, SetAvatarUrl] = useState(AvatarImage);

  const handleChange = (files: FileList | null) => {
    if (files) {
      SetAvatar(files[0]);
      SetAvatarUrl(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("password", password);

    data.append("avatar", avatar);
  };

  return (
    <CardForm
      title="Criar conta"
      subtitle="Você já tem uma conta?"
      subtitleLink="Entrar"
      subtitleLinkHref="/entrar"
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
          placeholder="Nome"
          value={name}
          onChange={(e) => {
            SetName(e.target.value);
          }}
        />

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

export default Register;
