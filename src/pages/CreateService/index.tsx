import React, { FormEvent, useEffect, useState } from "react";
import CardForm from "../../components/CardForm";

import { InputBlock, Input } from "./styles";
import DatePicker from "../../components/DatePicker";
import Select from "../../components/Select";

import MenuItem from "@material-ui/core/MenuItem";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

const CreateService: React.FC = () => {
  const history = useHistory();

  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [serviceValue, setServiceValue] = useState("");

  const [selectOpen, setSelectOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<string | number>('10');
  const [serviceTypes, setServiceTypes] = useState<[{id:number;tipo:string;}]>();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleSelectClose = () => {
    getServiceTypes();
    setSelectOpen(false);
  };
  const handleSelectOpen = () => {
    getServiceTypes();
    setSelectOpen(true);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectValue(event.target.value as string);   
  };

  const getServiceTypes = async () => {
    const { data:serviceTypes } = await api.get("/servicetypes");

    const selectData = serviceTypes.map((MyService: any) => {
      const {
        id,
        service_name:serviceType,
      } = MyService;
      return {
        id,
        tipo: serviceType,
      };
    });
    setServiceTypes(selectData);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (
      !serviceName ||
      !description ||
      !serviceValue||
      selectValue ==="10" ||
      !selectedDate
    ) {
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
      await api.post("/services", data);
      history.push('/');

    } catch (error) {
      alert('Erro ao salvar seu serviço, tente novamente.\n Caso o problema persista entre em'+
      'contato com o administrador através do contato abaixo: \n\n Gustavo - (44) 9 9957-1618');
    }
  };

  useEffect(() => {
    getServiceTypes();
  }, []);
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
          <MenuItem  value={"10"}>Selecione um tipo</MenuItem>
          {console.log('serviceTypes\n\n')}
          {console.log(serviceTypes)}
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
  );
};

export default CreateService;
