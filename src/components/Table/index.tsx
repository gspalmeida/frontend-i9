import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import ButtonDelete from "../ButtonDelete";
import ButtonEdit from "../ButtonEdit";

interface IProductDetail {
  id: number;
  name: string;
  tipo: string;
  descricao: string;
  valor: string;
  disponivelAte: string;
}

interface IMyTable {
  services: {
    id: number;
    name: string;
    tipo: string;
    descricao: string;
    valor: string;
    disponivelAte: string;
  }[];

  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalProductDetail: React.Dispatch<React.SetStateAction<IProductDetail>>;
}

const MyTable: React.FC<IMyTable> = ({
  services,
  setOpenModal,
  setModalProductDetail,
}) => {
  const deleteService = (id: number) => {
    console.log(id);
  };
  const editService = (id: number) => {
    console.log(id);

    const service = services.find((service) => service.id === id);

    setOpenModal(true);
    if (service) {
      setModalProductDetail(service);
    } else {
      setModalProductDetail({} as IProductDetail);
    }
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
      <Table style={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="left">Tipo</TableCell>
            <TableCell width="100px" align="left">
              Descrição
            </TableCell>
            <TableCell align="left">Valor</TableCell>
            <TableCell align="left">Disponivel até</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell component="th" scope="row">
                {service.name}
              </TableCell>
              <TableCell align="left">{service.tipo}</TableCell>
              <TableCell width="400px" align="left">
                {service.descricao}
              </TableCell>
              <TableCell align="left">R$ {service.valor}</TableCell>
              <TableCell align="left">{service.disponivelAte}</TableCell>
              <TableCell align="right" style={{ display: "flex" }}>
                <ButtonDelete onClick={() => deleteService(service.id)} />
                <ButtonEdit onClick={() => editService(service.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
