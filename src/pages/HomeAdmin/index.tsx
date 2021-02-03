import React, { useEffect, useState } from "react";
import FilterByDate from "../../components/FilterByDate";
import ServicesModal from "../../components/ServicesModal";
import ServiceTypesModal from "../../components/ServiceTypesModal";
import ServicesRenderer from "../../components/ServicesRenderer";
import ServiceTypesRenderer from "../../components/ServiceTypesRenderer";
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
interface ServiceTypeDetail {
  id: number;
  name: string;
}

const HomeAdmin: React.FC = () => {
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
      name: "Nenhum serviço cadastrado",
      tipo: "-",
      descricao: "-",
      valor: "-",
      disponivelAte: "-",
    },
  ]);
  const [openServicesModal, setOpenServicesModal] = useState(false);
  const [modalServiceDetail, setModalServiceDetail] = useState<ServiceDetail>(
    {} as ServiceDetail
  );
  const [serviceTypes, setServiceTypes] = useState<[{ id: number; name: string }]>();
  const [openServiceTypesModal, setOpenServiceTypesModal] = useState(false);
  const [modalServiceTypeDetail, setModalServiceTypeDetail] = useState<ServiceTypeDetail>(
    {} as ServiceTypeDetail
  );

  const getServiceTypes = async () => {
    const { data: serviceTypes } = await api.get("/servicetypes");
    const parsedTypes = serviceTypes.map((MyService: any) => {
      const { id, service_name: name } = MyService;
      return {
        id,
        name
      };
    });
    setServiceTypes(parsedTypes);
  };

  const getServices = async () => {
    const { data } = await api.get("/admin/services");

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
    if (servicesData.name){
      setServices(servicesData);
    }
  };

  useEffect(() => {
    if (!openServiceTypesModal){
      getServiceTypes();
    }
    if (!openServicesModal) {
      getServices();
    }
  }, [openServicesModal,openServiceTypesModal]);

  return (
    <>
      <Header />
      <Container>
        {serviceTypes && (
          <>
            <Title>Tipos de Serviços</Title>
            <ServiceTypesRenderer
              serviceTypes={serviceTypes}
              setOpenServiceTypesModal={setOpenServiceTypesModal}
              setModalServiceTypesDetail={setModalServiceTypeDetail}
              getServiceTypes={getServiceTypes}
            />
          </>
        )}
        {openServiceTypesModal && (
          <ServiceTypesModal
            serviceTypesDetail={modalServiceTypeDetail}
            setOpenServiceTypesModal={setOpenServiceTypesModal}
          />
        )}
        <Title>Todos os Serviços</Title>
        {services && <FilterByDate setServices={setServices} />}
        {services && (
          <ServicesRenderer
            services={services}
            setOpenServicesModal={setOpenServicesModal}
            setModalServiceDetail={setModalServiceDetail}
            getServices={getServices}
          />
        )}
        {openServicesModal && (
          <ServicesModal
            serviceDetail={modalServiceDetail}
            setOpenModal={setOpenServicesModal}
          />
        )}
      </Container>
    </>
  );
};

export default HomeAdmin;
