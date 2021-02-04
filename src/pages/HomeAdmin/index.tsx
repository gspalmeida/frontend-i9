import React, { useEffect, useState } from "react";
import FilterByDate from "../../components/FilterByDate";
import ServicesModal from "../../components/ServicesModal";
import ServicesRenderer from "../../components/ServicesRenderer";
import ServiceTypesModal from "../../components/ServiceTypesModal";
import ServiceTypesRenderer from "../../components/ServiceTypesRenderer";
import ProvidersRenderer from "../../components/ProvidersRenderer";
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
interface ProviderDetail {
  id: string;
  avatar: string;
  name: string;
  email: string;
  allowAccess: boolean;
  avaliated: string;
}
interface ServiceTypeDetail {
  id: number;
  name: string;
}

const HomeAdmin: React.FC = () => {
  const [services, setServices] = useState<ServiceDetail[]>([{} as ServiceDetail]);
  const [openServicesModal, setOpenServicesModal] = useState(false);
  const [modalServiceDetail, setModalServiceDetail] = useState<ServiceDetail>(
    {} as ServiceDetail
  );
  const [providers, setProviders] = useState<ProviderDetail[]>([{} as ProviderDetail]);

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
    const { data } = await api.get("/admins/services/all");

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
    
    setServices(servicesData);
  };

  const getProviders = async () => {
    const { data } = await api.get("/admins/providers/");

    const servicesData = data.map((MyService: any) => {
      const {
        id ,
        avatar,
        name,
        email,
        allow_access,
        avaliated
      } = MyService;
      return {
        id,
        avatar,
        name,
        email,
        allowAccess: allow_access,
        avaliated,
      };
    });
    
    setProviders(servicesData);
  };

  useEffect(() => {
    if (!openServiceTypesModal){
      getServiceTypes();
    }
    if (!openServicesModal) {
      getServices();
    }
    getProviders();
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
        {services &&<Title>Todos os Serviços</Title>}
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
        {providers &&<Title>Provedores de Serviço à Aprovar</Title>}
        {providers && (
          <ProvidersRenderer
            providers={providers}
            getProviders={getProviders}
          />
        )}

      </Container>
    </>
  );
};

export default HomeAdmin;
