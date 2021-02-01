import React, { FormEvent, useState } from "react";
import CardForm from "../../components/CardForm";

import { InputBlock, Input } from "./styles";
import DatePicker from "../../components/DatePicker";
import Select from "../../components/Select";

import MenuItem from "@material-ui/core/MenuItem";

const CreateService: React.FC = () => {
  const [serviceName, SetServiceName] = useState("");
  const [description, SetDescription] = useState("");
  const [serviceValue, SetServiceValue] = useState("");

  const [selectOpen, SetSelectOpen] = useState(false);
  const [selectValue, SetSelectValue] = useState<string | number>(1);
  const [serviceTypes, SetServiceTypes] = useState([
    { id: 1, name: "teste" },
    { id: 2, name: "teste2" },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleSelectClose = () => {
    SetSelectOpen(false);
  };
  const handleSelectOpen = () => {
    SetSelectOpen(true);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    SetSelectValue(event.target.value as number);
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
            SetServiceName(e.target.value);
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
            SetDescription(e.target.value);
          }}
        />
        <Input
          required
          placeholder="Valor"
          type="number"
          value={serviceValue}
          onChange={(e) => {
            SetServiceValue(e.target.value);
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
