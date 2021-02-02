import React, { useState } from "react";
import FilterByDate from "../../components/FilterByDate";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import Header from "../../components/Header";

import { Container, Title } from "./styles";

interface IProductDetail {
  id: number;
  name: string;
  tipo: string;
  descricao: string;
  valor: string;
  disponivelAte: string;
}

const HomeClient: React.FC = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Limpeza doméstica",
      tipo: "Limpeza",
      descricao: "Descricaa aaaaaaaaaaa aaaaaaaaaao",
      valor: "50,00",
      disponivelAte: "10/02/2021",
    },

    {
      id: 2,
      name: "Limpeza doméstica2",
      tipo: "Limpeza2",
      descricao:
        "Descricaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaao",
      valor: "52,00",
      disponivelAte: "12/02/2021",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [modalProductDetail, setModalProductDetail] = useState<IProductDetail>(
    {} as IProductDetail
  );

  return (
    <>
      <Header />
      <Container>
        <Title>Meus Serviços</Title>
        <FilterByDate setServices={setServices} />
        <Table
          services={services}
          setOpenModal={setOpenModal}
          setModalProductDetail={setModalProductDetail}
        />

        {openModal && (
          <Modal
            productDetail={modalProductDetail}
            setOpenModal={setOpenModal}
          />
        )}
      </Container>
    </>
  );
};

export default HomeClient;
