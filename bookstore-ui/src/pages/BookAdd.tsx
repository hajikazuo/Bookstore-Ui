import React, { useState } from 'react';
import { Button, Box, CircularProgress, Stack, Snackbar, Alert, TextField } from '@mui/material';
import { BookDTORequest } from '../api/models/Books/BookDTORequest';
import { useAddBook } from '../hooks/books/AddBookHook';
import Breadcrumb from '../components/layout/BreadCrumb';


const BookAdd = () => {
    const { loading, error, addBook, openSnackbar, snackbarMessage, handleCloseSnackbar } = useAddBook();
    const [newBook, setNewBook] = useState<BookDTORequest>({
        title: '',
        author: '',
        publisher: '',
        year: 0,
        edition: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await addBook(newBook);

        setNewBook({
            title: '',
            author: '',
            publisher: '',
            year: 0,
            edition: '',
        });
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Breadcrumb
                paths={[
                    { label: 'Home', href: '/' },
                    { label: 'Books' },
                    { label: 'Add book' },
                ]}
            />
            <h1>Add New Book</h1>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        id="title"
                        label="Title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        fullWidth
                        required
                        helperText="Enter the book title"
                    />

                    <TextField
                        id="author"
                        label="Author"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        fullWidth
                        required
                        helperText="Enter the author's name"
                    />

                    <TextField
                        id="publisher"
                        label="Publisher"
                        value={newBook.publisher}
                        onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })}
                        fullWidth
                        required
                        helperText="Enter the publisher's name"
                    />

                    <TextField
                        id="year"
                        label="Year"
                        value={newBook.year || ''}
                        onChange={(e) => setNewBook({ ...newBook, year: parseInt(e.target.value) || 0 })}
                        type="number"
                        fullWidth
                        helperText="Enter the year of publication"
                    />

                    <TextField
                        id="edition"
                        label="Edition"
                        value={newBook.edition}
                        onChange={(e) => setNewBook({ ...newBook, edition: e.target.value })}
                        fullWidth
                        required
                        helperText="Enter the book edition"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Add Book'}
                    </Button>
                </Stack>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

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

export default BookAdd;
