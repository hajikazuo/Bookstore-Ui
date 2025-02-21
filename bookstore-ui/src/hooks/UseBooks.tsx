import { useEffect, useState } from 'react';
import { BookDTO } from '../api/models/BookDTO';
import { PaginationHeader } from '../api/models/pagination/PaginationHeader';
import { PaginationParams } from '../api/models/pagination/PaginationParams';
import { getBooks } from '../api/endpoints/BookApi';

export const useBooks = () => {
    const [books, setBooks] = useState<BookDTO[]>([]);
    const [pagination, setPagination] = useState<PaginationHeader | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async (paginationParams: PaginationParams) => {
        setLoading(true);
        try {
            const { data, pagination } = await getBooks(paginationParams);
            setBooks(data); 
            setPagination(pagination);
        } catch (err) {
            console.error('Error when searching for books:', err);
            setError('Error loading books');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks({ pageNumber: 1, pageSize: 10 });
    }, []);

    return { books, pagination, loading, error, fetchBooks };
};