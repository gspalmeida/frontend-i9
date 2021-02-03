import React, { FormEvent } from "react";
import { useState } from "react";


import { CloseIcon, InputBlock, Input } from "./styles";

import CardForm from "../CardForm";
import api from "../../services/api";

interface IModal {
  serviceTypesDetail: IServiceTypesProps;
  setOpenServiceTypesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IServiceTypesProps {
  id: number;
  name: string;
}

const ServiceTypesModal: React.FC<IModal> = ({ serviceTypesDetail, setOpenServiceTypesModal }) => {

  const id = serviceTypesDetail.id;
  const [serviceTypeName, setServiceTypeName] = useState(serviceTypesDetail.name);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!serviceTypeName || !id ) {
      window.alert("Preencha o nome do tipo que deseja criar");
    }
    const data = {
      name: serviceTypeName
    };
    try {
      await api.put(`/admins/servicetypes/${serviceTypesDetail.id}`, data);
      setOpenServiceTypesModal(false);
    } catch (error) {
      alert(
        "Erro ao salvar seu serviço, tente novamente.\n\nCaso o problema persista entre em" +
        " contato com o administrador através do contato abaixo: \n\n Gustavo - (44) 9 9957-1618"
      );
    }
  };

  if (!serviceTypesDetail) {
    return null;
  }
  return (
    <>
      <CloseIcon onClick={() => {setOpenServiceTypesModal(false);}}/>
      <CardForm
        title={`Editar Tipo de Serviço`}
        buttonTitle="Aplicar Alterações"
        onSubmit={handleSubmit}
        style={{
          background: "rgba(0,0,0,0.85)",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <InputBlock>
          <Input
            required
            placeholder="Nome do tipo de serviço"
            value={serviceTypeName}
            onChange={(e) => {
              setServiceTypeName(e.target.value);
            }}
          />
        </InputBlock>
      </CardForm>
    </>
  );
};

export default ServiceTypesModal;
