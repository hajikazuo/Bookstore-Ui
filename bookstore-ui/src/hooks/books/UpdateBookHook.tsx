import { useState } from 'react';
import { updateBook as updateBookApi } from '../../api/endpoints/BookApi';
import { BookDTOResponse } from '../../api/models/Books/BookDTOResponse';

export const useUpdateBook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

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
        updateBookHandler,  
        openSnackbar,
        snackbarMessage,
        handleCloseSnackbar
    };
};
