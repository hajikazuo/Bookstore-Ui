import React from "react";
import { BookDTO } from "../api/models/BookDTO";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface BookListProps {
  books?: BookDTO[];
}

const BookList: React.FC<BookListProps> = ({ books = [] }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Título</strong></TableCell>
            <TableCell><strong>Autor</strong></TableCell>
            <TableCell><strong>Editora</strong></TableCell>
            <TableCell><strong>Ano</strong></TableCell>
            <TableCell><strong>Edição</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.publisher}</TableCell>
              <TableCell>{book.year}</TableCell>
              <TableCell>{book.edition}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookList;
