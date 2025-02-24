import { useState, useEffect } from 'react';
import { BookDTOResponse } from '../../api/models/Books/BookDTOResponse';
import { getBookById } from '../../api/endpoints/BookApi';

export const useGetBookById = (id: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [book, setBook] = useState<BookDTOResponse | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            setError(null); 
            try {
                const data = await getBookById(id);
                setBook(data);
            } catch (err) {
                console.error('Error fetching book:', err);
                setError('Error loading book');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBook();
        }
    }, [id]);

    return {
        loading,
        error,
        book,
    };
};
