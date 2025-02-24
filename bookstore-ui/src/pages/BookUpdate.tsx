import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../api/endpoints/BookApi';
import { TextField, Button, Snackbar, Box, Stack, Alert } from '@mui/material';
import { BookDTOResponse } from '../api/models/Books/BookDTOResponse';
import { useUpdateBook } from '../hooks/books/UpdateBookHook';
import Breadcrumb from '../components/layout/BreadCrumb';

const BookUpdate = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();
    const { loading, error, updateBookHandler, openSnackbar, snackbarMessage, handleCloseSnackbar } = useUpdateBook();
    const [book, setBook] = useState<BookDTOResponse | null>(null);

    useEffect(() => {
        if (bookId) {
            const fetchBook = async () => {
                try {
                    const fetchedBook = await getBookById(bookId);
                    setBook(fetchedBook);
                } catch (err) {
                    console.error('Error fetching book details:', err);
                }
            };
            fetchBook();
        }
    }, [bookId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (book) {
            setBook({
                ...book,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (book && bookId) {
            await updateBookHandler(bookId, book);
            navigate(`/books/update/${bookId}`);
        }
    };

    if (!book) {
        return <p>Loading book details...</p>;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Breadcrumb
                paths={[
                    { label: 'Home', href: '/' },
                    { label: 'Books' },
                    { label: 'Edit book' },
                ]}
            />
            <h1>Edit Book</h1>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Title"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Author"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Publisher"
                        name="publisher"
                        value={book.publisher}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Year"
                        name="year"
                        value={book.year}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        type="number"
                    />
                    <TextField
                        label="Edition"
                        name="edition"
                        value={book.edition}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
                        {loading ? 'Updating...' : 'Update Book'}
                    </Button>
                </Stack>
            </form>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity={error ? 'error' : 'success'}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default BookUpdate;
