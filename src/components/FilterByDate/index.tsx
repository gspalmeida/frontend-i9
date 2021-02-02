import React, { useState } from "react";
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

  const removeFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };
  const filterByDate = () => {
    console.log("filtrado!");
    setServices([
      {
        id: 2,
        name: "Limpeza doméstica2",
        tipo: "Limpeza2",
        descricao:
          "descricaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaao",
        valor: "52.00",
        disponivelAte: "12/02/2021",
      },
    ]);
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
