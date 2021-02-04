import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import ButtonApprove from "../ButtonApprove";
import ButtonDisaprove from "../ButtonDisaprove";
import api from "../../services/api";

interface IMyTable {
  providers: {
    id: string,
    avatar: string,
    name: string,
    email: string,
    allowAccess: boolean,
    avaliated: string,
  }[];
  getProviders: () => Promise<void>;
}

const MyTable: React.FC<IMyTable> = ({
  providers,
  getProviders,
}) => {
  const approveProvider = async (id: string) => {
    await api.put(`/admins/providers/${id}`);
    getProviders();
  };
  const deleteProvider = async (id: string) => {
    await api.delete(`/admins/providers/${id}`);
    getProviders();
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
      <Table style={{ minWidth: 650 }} size="small" aria-label="A list of providers">
        <TableHead>
          <TableRow>
            <TableCell><p style={{fontWeight:600, fontSize:15}}>Nome</p></TableCell>
            <TableCell align="left"><p style={{fontWeight:600, fontSize:15}}>Email</p></TableCell>
            <TableCell align="left"><p style={{fontWeight:600, fontSize:15}}>Acesso à Plataforma</p></TableCell>
            <TableCell width="100px" align="left">
            <p style={{fontWeight:600, fontSize:15}}>Ações</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {providers.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell component="th" scope="row">
                {provider.name}
              </TableCell>
              <TableCell align="left">{provider.email}</TableCell>
              <TableCell align="left">
                {provider.allowAccess === false && "Aguardando Aprovação"}
              </TableCell>
              <TableCell align="right" style={{ display: "flex" }}>
                <ButtonDisaprove onClick={() => deleteProvider(provider.id)} />
                <ButtonApprove onClick={() => approveProvider(provider.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
