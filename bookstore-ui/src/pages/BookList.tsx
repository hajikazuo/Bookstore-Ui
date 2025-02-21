import React from 'react';
import { useBooks } from '../hooks/UseBooks';
import BookList from '../components/BookList';
import CustomPagination from '../components/layout/Pagination';
import { Box } from '@mui/material';

const BooksPage: React.FC = () => {
  const { books, pagination, loading, error, fetchBooks } = useBooks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  console.log(pagination)
  return (
    <Box sx={{ p: 3 }}>
      <h1>Books</h1>
      <BookList books={books} />
      {pagination && (
        <CustomPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(pageNumber) =>
            fetchBooks({ pageNumber, pageSize: pagination.pageSize })
          }
        />
      )}
    </Box>
  );
};

export default BooksPage;