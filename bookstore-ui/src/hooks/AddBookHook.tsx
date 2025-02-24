import { useState } from 'react';
import { addBook as addBookApi } from '../api/endpoints/BookApi';
import { BookDTORequest } from '../api/models/Books/BookDTORequest';

export const useAddBook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const addBook = async (newBook: BookDTORequest) => {
        setLoading(true);
        try {
            await addBookApi(newBook); 
            setSnackbarMessage('Book added successfully!');
            setOpenSnackbar(true);
          
        } catch (err) {
            console.error('Error adding book:', err);
            setError('Error adding book');
            setSnackbarMessage('Error adding book');
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
        addBook,
        openSnackbar,
        snackbarMessage,
        handleCloseSnackbar
    };
};
