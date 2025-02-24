import React from 'react';
import ClientTable from '../components/tables/ClientTable';
import CustomPagination from '../components/layout/Pagination';
import { Box } from '@mui/material';
import Breadcrumb from '../components/layout/BreadCrumb';
import TableSkeleton from '../components/layout/TableSkeleton';
import { useListClients } from '../hooks/clients/ListClientHook';

const ClientList: React.FC = () => {
  const { clients, pagination, loading, error, fetchClients } = useListClients();

  return (
    <Box sx={{ padding: 3 }}>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Clients' },
          { label: 'List Clients' }, 
        ]}
      />
      <h1>Clients</h1>

      {loading ? (
        <TableSkeleton rows={10} columns={5} />
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <ClientTable clients={clients} />
          {pagination && (
            <CustomPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(pageNumber) =>
                fetchClients({ pageNumber, pageSize: pagination.pageSize })
              }
            />
          )}
        </>
      )}
    </Box>
  );
};

export default ClientList;
