import React from "react";
import { useNavigate } from "react-router-dom";
import { BookDTOResponse } from "../../api/models/Books/BookDTOResponse";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup,
} from "@mui/material";

interface BookListProps {
  books?: BookDTOResponse[];
}

const BookTable: React.FC<BookListProps> = ({ books = [] }) => {
  const navigate = useNavigate();

  const handleViewDetails = (bookId: string) => {
    navigate(`/books/details/${bookId}`);
  };

  const handleEditBook = (bookId: string) => {
    navigate(`/books/update/${bookId}`);
  };

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
            <TableCell><strong>Action</strong></TableCell>
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
              <TableCell>
                <ButtonGroup variant="contained" aria-label="book actions">
                  <Button
                    color="secondary"
                    onClick={() => handleEditBook(book.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => handleViewDetails(book.id)}
                  >
                    Details
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;
