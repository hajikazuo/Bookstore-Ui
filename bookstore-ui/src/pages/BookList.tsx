import React from 'react';
import BookTable from '../components/tables/BookTable';
import CustomPagination from '../components/layout/Pagination';
import { Box } from '@mui/material';
import Breadcrumb from '../components/layout/BreadCrumb';
import TableSkeleton from '../components/layout/TableSkeleton';
import { useListBooks } from '../hooks/books/ListBookHook';

const BookList: React.FC = () => {
  const { books, pagination, loading, error, fetchBooks } = useListBooks();

  return (
    <Box sx={{ padding: 3 }}>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Books' },
          { label: 'List Books' }, 
        ]}
      />
      <h1>Books</h1>

      {loading ? (
        <TableSkeleton rows={10} columns={5} />
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
};

export default BookList;
