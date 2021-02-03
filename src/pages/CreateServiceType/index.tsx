import React, { FormEvent, useState } from "react";
import CardForm from "../../components/CardForm";

import { InputBlock, Input } from "./styles";

import api from "../../services/api";
import { useHistory } from "react-router-dom";

const CreateService: React.FC = () => {
  const history = useHistory();

  const [serviceTypeName, setServiceTypeName] = useState("");


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!serviceTypeName) {
      window.alert("Preencha o nome do novo Tipo");
      return;
    }
    const data = {
      serviceName: serviceTypeName,
    };
    try {
      await api.post("/admins/servicetypes", data);
      history.push("/");
    } catch (error) {
      alert(
        "Erro ao salvar seu serviço, tente novamente.\n\nCaso o problema persista entre em" +
        " contato com o administrador através do contato abaixo: \n\n Gustavo - (44) 9 9957-1618"
      );
    }
  };

  return (
    <CardForm
      subtitle="Não deseja mais realizar um cadastro?"
      subtitleLink="Voltar"
      subtitleLinkHref="/"
      title={`Cadastrar Tipo de Serviço`}
      buttonTitle="Salvar Cadastro"
      onSubmit={handleSubmit}
    >
      <InputBlock>
        <Input
          required
          placeholder="Nome do serviço"
          value={serviceTypeName}
          onChange={(e) => {
            setServiceTypeName(e.target.value);
          }}
        />
      </InputBlock>
    </CardForm>
  );
};

export default CreateService;
