import React, { FormEvent, useState } from "react";
import CardForm from "../../components/CardForm";

import { InputBlock, Input } from "./styles";
import DatePicker from "../../components/DatePicker";
import Select from "../../components/Select";

import MenuItem from "@material-ui/core/MenuItem";

const CreateService: React.FC = () => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [serviceValue, setServiceValue] = useState("");

  const [selectOpen, setSelectOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<string | number>(1);
  const [serviceTypes, setServiceTypes] = useState([
    { id: 1, name: "teste" },
    { id: 2, name: "teste2" },
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
    setServiceTypes([]);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectValue(event.target.value as number);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
