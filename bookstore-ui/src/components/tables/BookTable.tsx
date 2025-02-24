import React from "react";
import { BookDTOResponse } from "../../api/models/Books/BookDTOResponse";
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
  books?: BookDTOResponse[];
}

const BookTable: React.FC<BookListProps> = ({ books = [] }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Author</strong></TableCell>
            <TableCell><strong>Publisher</strong></TableCell>
            <TableCell><strong>Year</strong></TableCell>
            <TableCell><strong>Edition</strong></TableCell>
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

export default BookTable;
