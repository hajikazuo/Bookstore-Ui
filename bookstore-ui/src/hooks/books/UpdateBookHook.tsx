import { useEffect, useState } from 'react';
import { getBookById, updateBook as updateBookApi } from '../../api/endpoints/BookApi';
import { BookDTOResponse } from '../../api/models/Books/BookDTOResponse';

export const useUpdateBook = (bookId?: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [book, setBook] = useState<BookDTOResponse | null>(null);

    useEffect(() => {
        if (bookId) {
            const fetchBook = async () => {
                setLoading(true);
                try {
                    const fetchedBook = await getBookById(bookId);
                    setBook(fetchedBook);
                } catch (err) {
                    console.error('Error fetching book details:', err);
                    setError('Error fetching book details');
                } finally {
                    setLoading(false);
                }
            };
            fetchBook();
        }
    }, [bookId]);

    const updateBookHandler = async (id: string, updatedBook: BookDTOResponse) => {
        setLoading(true);
        setError(null);  
        setSnackbarMessage('');  

        try {
            await updateBookApi(id, updatedBook);  
            setSnackbarMessage('Book updated successfully!');
            setOpenSnackbar(true);
        } catch (err) {
            console.error('Error updating book:', err);
            setError('Error updating book');
            setSnackbarMessage('Error updating book');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return {
        loading,
        error,
        book,
        setBook,
        updateBookHandler,  
        openSnackbar,
        snackbarMessage,
        handleCloseSnackbar
    };
};
