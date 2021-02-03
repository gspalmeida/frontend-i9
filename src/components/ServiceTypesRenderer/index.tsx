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

interface ServiceTypeDetail {
  id: number;
  name: string;
}

interface IMyTable {
  serviceTypes: {
    id: number;
    name: string;
  }[];
  getServiceTypes: () => Promise<void>;
  setOpenServiceTypesModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalServiceTypesDetail: React.Dispatch<React.SetStateAction<ServiceTypeDetail>>;
}

const ServiceTypesRenderer: React.FC<IMyTable> = ({
  serviceTypes,
  setOpenServiceTypesModal,
  setModalServiceTypesDetail,
  getServiceTypes,
}) => {
  const deleteService = async (id: number) => {
    await api.delete(`/admins/servicetypes/${id}`);
    getServiceTypes();
  };
  const editService = (id: number) => {
    console.log(id);

    const serviceType = serviceTypes.find((serviceType) => serviceType.id === id);

    setOpenServiceTypesModal(true);
    if (serviceType) {
      setModalServiceTypesDetail(serviceType);
    } else {
      setModalServiceTypesDetail({} as ServiceTypeDetail);
    }
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
      <Table style={{ minWidth: 650 }} size="small" aria-label="Table with TypeServices">
        <TableHead>
          <TableRow>
            <TableCell><p style={{fontWeight:600, fontSize:15}}>Nomes</p></TableCell>
            <TableCell align="right"><p style={{fontWeight:600, fontSize:15}}>Ações</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serviceTypes.map((serviceType) => (
            <TableRow key={serviceType.id}>
              <TableCell component="th" scope="row">
                {serviceType.name}
              </TableCell>
              <TableCell align="right" style={{ display: "flex" }}>
                <ButtonDelete onClick={() => deleteService(serviceType.id)} />
                <ButtonEdit onClick={() => editService(serviceType.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServiceTypesRenderer;
