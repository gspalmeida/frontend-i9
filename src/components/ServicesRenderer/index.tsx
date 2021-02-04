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
import api from "../../services/api";

interface ServiceDetail {
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
  getServices: () => Promise<void>;
  setOpenServicesModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalServiceDetail: React.Dispatch<React.SetStateAction<ServiceDetail>>;
}

const MyTable: React.FC<IMyTable> = ({
  services,
  setOpenServicesModal,
  setModalServiceDetail,
  getServices,
}) => {
  const deleteService = async (id: number) => {
    await api.delete(`/services/${id}`);
    getServices();
  };
  const editService = (id: number) => {
    console.log(id);

    const service = services.find((service) => service.id === id);

    setOpenServicesModal(true);
    if (service) {
      setModalServiceDetail(service);
    } else {
      setModalServiceDetail({} as ServiceDetail);
    }
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
      <Table style={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><p style={{fontWeight:600, fontSize:15}}>Nome</p></TableCell>
            <TableCell align="left"><p style={{fontWeight:600, fontSize:15}}>Tipo</p></TableCell>
            <TableCell width="100px" align="left">
            <p style={{fontWeight:600, fontSize:15}}>Descrição</p>
            </TableCell>
            <TableCell align="left"><p style={{fontWeight:600, fontSize:15}}>Valor</p></TableCell>
            <TableCell align="left"><p style={{fontWeight:600, fontSize:15}}>Disponivel até</p></TableCell>
            <TableCell align="right"><p style={{fontWeight:600, fontSize:15}}>Ações</p></TableCell>
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
