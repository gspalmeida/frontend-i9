import React, { FormEvent, useEffect } from "react";
import { useState } from "react";

import DatePicker from "../DatePicker";
import Select from "../Select";

import { CloseIcon, InputBlock, Input } from "./styles";

import MenuItem from "@material-ui/core/MenuItem";
import CardForm from "../CardForm";
import api from "../../services/api";

interface IModal {
  serviceDetail: InterfaceServiceDetail;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InterfaceServiceDetail {
  id: number;
  name: string;
  tipo: string;
  descricao: string;
  valor: string;
  disponivelAte: string;
}

const ServicesModal: React.FC<IModal> = ({ serviceDetail, setOpenModal }) => {
  const day = serviceDetail.disponivelAte.split("/")[0];
  const month = serviceDetail.disponivelAte.split("/")[1];
  const year = serviceDetail.disponivelAte.split("/")[2];

  const [serviceName, setServiceName] = useState(serviceDetail.name);
  const [description, setDescription] = useState(serviceDetail.descricao);
  const [serviceValue, setServiceValue] = useState(
    serviceDetail.valor.replace(",", ".")
  );

  const [selectOpen, setSelectOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<string | number>(
    serviceDetail.tipo
  );
  const [serviceTypes, setServiceTypes] = useState<
    [{ id: number; tipo: string }]
  >();

  const [selectedDate, setSelectedDate] = useState(
    new Date(`${month}/${day}/${year}`)
  );

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleSelectClose = () => {
    setSelectOpen(false);
    getServiceTypes();
  };
  const handleSelectOpen = () => {
    setSelectOpen(true);
    getServiceTypes();
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectValue(event.target.value as number);
  };
  const getServiceTypes = async () => {
    const { data: serviceTypes } = await api.get("/servicetypes");

    const selectData = serviceTypes.map((MyService: any) => {
      const { id, service_name: serviceType } = MyService;
      return {
        id,
        tipo: serviceType,
      };
    });
    setServiceTypes(selectData);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!serviceName || !description || !serviceValue || !selectedDate) {
      window.alert("Preencha todos os dados");
    }
    const data = {
      name: serviceName,
      description: description,
      value: serviceValue,
      type: selectValue,
      dueDate: selectedDate.toLocaleDateString("pt-br"),
    };
    try {
      console.log(serviceDetail.id);
      await api.put(`/services/${serviceDetail.id}`, data);
      setOpenModal(false);
    } catch (error) {
      console.log(error.message);
      alert(
        "Erro ao salvar seu serviço, tente novamente.\n Caso o problema persista entre em" +
          "contato com o administrador através do contato abaixo: \n\n Gustavo - (44) 9 9957-1618"
      );
    }
  };

  useEffect(() => {
    getServiceTypes();
  }, []);

  if (!serviceDetail) {
    return null;
  }
  return (
    <>
      <CloseIcon
        onClick={() => {
          setOpenModal(false);
        }}
      />
      <CardForm
        title={`Editar serviço`}
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
            placeholder="Nome do serviço"
            value={serviceName}
            onChange={(e) => {
              setServiceName(e.target.value);
            }}
          />
          <Input
            required
            placeholder="Descrição"
            as="textarea"
            value={description}
            style={{
              height: 100,
              paddingTop: 10,
              maxHeight: 230,
              minHeight: 40,
              resize: "vertical",
            }}
            onChange={(e: any) => {
              setDescription(e.target.value);
            }}
          />
          <Input
            required
            placeholder="Valor"
            type="number"
            value={Number(serviceValue)}
            onChange={(e) => {
              setServiceValue(e.target.value);
            }}
          />
          <Select
            open={selectOpen}
            value={selectValue}
            handleClose={handleSelectClose}
            handleOpen={handleSelectOpen}
            handleChange={handleSelectChange}
          >
            <MenuItem value={"10"}>Selecione um tipo</MenuItem>
            {serviceTypes &&
              serviceTypes.map((serviceType) => (
                <MenuItem key={serviceType.id} value={serviceType.tipo}>
                  {serviceType.tipo}
                </MenuItem>
              ))}
          </Select>

          <DatePicker
            value={selectedDate}
            placeholder="Disponível até"
            handleChange={handleDateChange}
          />
        </InputBlock>
      </CardForm>
    </>
  );
};

export default ServicesModal;
