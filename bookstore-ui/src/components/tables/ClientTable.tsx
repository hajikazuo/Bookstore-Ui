import React from "react";
import { ClientDTOResponse } from "../../api/models/Clients/ClienteDTOResponse";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface ClientListProps {
  clients?: ClientDTOResponse[];
}

const ClientTable: React.FC<ClientListProps> = ({ clients = [] }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>CPF</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Address</strong></TableCell>
            <TableCell><strong>City</strong></TableCell>
            <TableCell><strong>Neighborhood</strong></TableCell>
            <TableCell><strong>Number</strong></TableCell>
            <TableCell><strong>Cellphone</strong></TableCell>
            <TableCell><strong>Telephone</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.cpf}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.address}</TableCell>
              <TableCell>{client.city}</TableCell>
              <TableCell>{client.neighborhood}</TableCell>
              <TableCell>{client.number}</TableCell>
              <TableCell>{client.cellphone}</TableCell>
              <TableCell>{client.telephone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientTable;
