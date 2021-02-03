import React, { useEffect, useState } from "react";
import FilterByDate from "../../components/FilterByDate";
import ServicesModal from "../../components/ServicesModal";
import ServicesRenderer from "../../components/ServicesRenderer";
import Header from "../../components/Header";

import { Container, Title } from "./styles";
import api from "../../services/api";

interface ServiceDetail {
  id: number;
  name: string;
  tipo: string;
  descricao: string;
  valor: string;
  disponivelAte: string;
}

const HomeClient: React.FC = () => {
  const [services, setServices] = useState<
    {
      id: number;
      name: string;
      tipo: string;
      descricao: string;
      valor: string;
      disponivelAte: string;
    }[]
  >([
    {
      id: 0,
      name: "Crie um novo serviço no botão acima",
      tipo: "",
      descricao: "Descreva com detalhes o serviço que será prestado",
      valor: "xx,xx",
      disponivelAte: "dd/mm/aaaa",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [modalServiceDetail, setModalServiceDetail] = useState<ServiceDetail>(
    {} as ServiceDetail
  );

  const getServices = async () => {
    const { data } = await api.get("/services");

    const servicesData = data.map((MyService: any) => {
      const {
        id,
        name,
        service: { service_name },
        description,
        value,
        due_date,
      } = MyService;
      return {
        id,
        name,
        tipo: service_name,
        descricao: description,
        valor: value,
        disponivelAte: due_date,
      };
    });
    if (!!data[0]){
      setServices(servicesData);
    }
  };

  useEffect(() => {
    if (!openModal) {
      getServices();
    }
  }, [openModal]);

  return (
    <>
      <Header />
      <Container>
        <Title>Meus Serviços</Title>
        {services && <FilterByDate setServices={setServices} />}
        {services && (
          <ServicesRenderer
            services={services}
            setOpenServicesModal={setOpenModal}
            setModalServiceDetail={setModalServiceDetail}
            getServices={getServices}
          />
        )}
        {openModal && (
          <ServicesModal
            serviceDetail={modalServiceDetail}
            setOpenModal={setOpenModal}
          />
        )}
      </Container>
    </>
  );
};

export default HomeClient;
