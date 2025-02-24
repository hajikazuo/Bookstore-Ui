import React from 'react';
import { useListBooks } from '../hooks/ListBookHook';
import BookTable from '../components/BookTable';
import CustomPagination from '../components/layout/Pagination';
import { Box } from '@mui/material';
import Breadcrumb from '../components/layout/BreadCrumb';

const BookList: React.FC = () => {
  const { books, pagination, loading, error, fetchBooks } = useListBooks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Books' },
          { label: 'List Books' }, 
        ]}
      />
      <h1>Books</h1>
      <BookTable books={books} />
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

export default BookList;