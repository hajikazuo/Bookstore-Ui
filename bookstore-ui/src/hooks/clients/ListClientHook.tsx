import { useEffect, useState } from 'react';
import { ClientDTOResponse } from '../../api/models/Clients/ClienteDTOResponse';
import { PaginationHeader } from '../../api/models/pagination/PaginationHeader';
import { PaginationParams } from '../../api/models/pagination/PaginationParams';
import { getClients } from '../../api/endpoints/ClientApi';


export const useListClients = () => {
    const [clients, setClients] = useState<ClientDTOResponse[]>([]);
    const [pagination, setPagination] = useState<PaginationHeader | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchClients = async (paginationParams: PaginationParams) => {
        setLoading(true);
        try {
            const { data, pagination } = await getClients(paginationParams);
            setClients(data); 
            setPagination(pagination);
        } catch (err) {
            console.error('Error when searching for clients:', err);
            setError('Error loading clients');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients({ pageNumber: 1, pageSize: 10 });
    }, []);

    return { clients, pagination, loading, error, fetchClients };
};