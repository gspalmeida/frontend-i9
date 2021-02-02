import React, { FormEvent, useState } from "react";
import CardForm from "../../components/CardForm";

import { InputBlock, Input } from "./styles";
import DatePicker from "../../components/DatePicker";
import Select from "../../components/Select";

import MenuItem from "@material-ui/core/MenuItem";
import api from "../../services/api";

const CreateService: React.FC = () => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [serviceValue, setServiceValue] = useState("");

  const [selectOpen, setSelectOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<string | number>(10);
  const [serviceTypes, setServiceTypes] = useState([
    { id: 1, name: "teste" },
    { id: 2, name: "Limpeza" },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleSelectClose = () => {
    setSelectOpen(false);
  };
  const handleSelectOpen = () => {
    setSelectOpen(true);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectValue(event.target.value as number);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const type = serviceTypes.find(
      (serviceType) => serviceType.id === selectValue
    )?.name;
    if (
      !serviceName ||
      !description ||
      !serviceValue ||
      !type ||
      !selectedDate
    ) {
      window.alert("Preencha todos os dados");
    }

    const data = {
      name: serviceName,
      description: description,
      value: serviceValue,
      type: type,
      dueDate: selectedDate.toLocaleDateString("pt-br"),
    };

    await api.post("/services", data);

    /*{
      "name": "Limpeza Simples",
      "description": "Limpeza superficial da casa, realizada em meio periodo, ou seja, 4 horas.",
      "value": "60,00",
      "type": "Limpeza",
      "dueDate": "13/08/2021"
    }*/
  };
  return (
    <CardForm
      title={`Cadastrar serviço`}
      buttonTitle="Salvar Cadastro"
      onSubmit={handleSubmit}
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
          value={serviceValue}
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
          <MenuItem value={""}>Selecione um tipo</MenuItem>
          {serviceTypes &&
            serviceTypes.map((serviceType) => (
              <MenuItem key={serviceType.id} value={serviceType.id}>
                {serviceType.name}
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
  );
};

export default CreateService;
