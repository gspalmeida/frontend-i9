import React, { useState } from "react";
import api from "../../services/api";
import moment from 'moment';
import DatePicker from "../DatePicker";

import {
  Container,
  Left,
  Right,
  DatepickerContainer,
  Label,
  Button,
} from "./styles";

interface IFilterByDate {
  setServices: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
        tipo: string;
        descricao: string;
        valor: string;
        disponivelAte: string;
      }[]
    >
  >;
}

const FilterByDate: React.FC<IFilterByDate> = ({ setServices }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  const removeFilters = async () => {
    setStartDate(null);
    setEndDate(null);
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

      setServices(servicesData);
    
  };
  const filterByDate = async () => {
    if (startDate!==null && endDate !== null){
      const parsedStartDate = moment(startDate).format('DD/MM/YYYY');
      const parsedEndDate = moment(endDate).format('DD/MM/YYYY');
      console.log('filter %s %s', parsedStartDate, parsedEndDate);
      try {
        const {data} = await api.get('/services', {params:{startDate: parsedStartDate, endDate:parsedEndDate}});
        const filteredServices = data.map((MyService: any) => {
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
        
        setServices(filteredServices);
        console.log("filtrado!");
      } catch (error) {
        alert("Erro ao filtrar serviços");
      }
    }else{
      alert("Informe a data de início e fim do filtro.");
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

      setServices(servicesData);
    } 
  };

  return (
    <Container>
      <Left>
        <DatepickerContainer>
          <Label>Data de Início</Label>
          <DatePicker
            value={startDate}
            placeholder="DD/MM/AAAA"
            handleChange={handleStartDateChange}
            style={{
              backgroundColor: "#fff",
              borderRadius: 3,
              border: "1px solid rgb(75, 92, 107, 0.3)",
              width: 200,
            }}
          />
        </DatepickerContainer>

        <DatepickerContainer>
          <Label>Data de Fim</Label>
          <DatePicker
            value={endDate}
            placeholder="DD/MM/AAAA"
            handleChange={handleEndDateChange}
            style={{
              backgroundColor: "#fff",
              borderRadius: 3,
              border: "1px solid rgb(75, 92, 107, 0.3)",
              width: 200,
            }}
          />
        </DatepickerContainer>
      </Left>
      <Right>
        <Button
          color="#D3455B"
          outlined
          style={{ width: 150 }}
          onClick={removeFilters}
        >
          Remover Fitros
        </Button>
        <Button color="#6558F5" onClick={filterByDate}>
          Filtrar pela data
        </Button>
      </Right>
    </Container>
  );
};

export default FilterByDate;
