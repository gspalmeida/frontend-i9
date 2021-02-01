import React, { useState } from "react";
import FilterByDate from "../../components/FilterByDate";
import Modal from "../../components/FilterByDate/Modal";
import Table from "../../components/Table";
import Header from "../../components/Header";

import { Container, Title } from "./styles";

const HomeClient: React.FC = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Limpeza doméstica",
      tipo: "Limpeza",
      descricao: "Descricaa aaaaaaaaaaa aaaaaaaaaao",
      valor: "R$ 50,00",
      disponivelAte: "10/02/2021",
    },

    {
      id: 2,
      name: "Limpeza doméstica2",
      tipo: "Limpeza2",
      descricao:
        "Descricaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaao",
      valor: "R$ 52,00",
      disponivelAte: "12/02/2021",
    },
  ]);
  return (
    <>
      <Header />
      <Container>
        <Title>Meus Serviços</Title>
        <FilterByDate setServices={setServices} />
        <Table services={services} />

        <Modal />
      </Container>
    </>
  );
};

export default HomeClient;
