import React, { FormEvent } from "react";
import { useState } from "react";

import DatePicker from "../DatePicker";
import Select from "../Select";

import { CloseIcon, InputBlock, Input } from "./styles";

import MenuItem from "@material-ui/core/MenuItem";
import CardForm from "../CardForm";

interface IModal {
  productDetail: IProductDetail;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IProductDetail {
  id: number;
  name: string;
  tipo: string;
  descricao: string;
  valor: string;
  disponivelAte: string;
}

const Modal: React.FC<IModal> = ({ productDetail, setOpenModal }) => {
  const day = productDetail.disponivelAte.split("/")[0];
  const month = productDetail.disponivelAte.split("/")[1];
  const year = productDetail.disponivelAte.split("/")[2];

  const [serviceName, setServiceName] = useState(productDetail.name);
  const [description, setDescription] = useState(productDetail.descricao);
  const [serviceValue, setServiceValue] = useState(
    productDetail.valor.replace(",", ".")
  );

  const [selectOpen, setSelectOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<string | number>(1);
  const [serviceTypes, setServiceTypes] = useState([
    { id: 1, name: "teste" },
    { id: 2, name: "teste2" },
  ]);

  const [selectedDate, setSelectedDate] = useState(
    new Date(`${month}/${day}/${year}`)
  );

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  if (!productDetail) {
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
    </>
  );
};

export default Modal;
