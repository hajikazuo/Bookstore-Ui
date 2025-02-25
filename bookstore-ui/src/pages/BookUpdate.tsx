import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, Box, Stack, Alert } from '@mui/material';
import { useUpdateBook } from '../hooks/books/UpdateBookHook';
import Breadcrumb from '../components/layout/BreadCrumb';

const BookUpdate = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();
    const { loading, error, book, setBook, updateBookHandler, openSnackbar, snackbarMessage, handleCloseSnackbar } = useUpdateBook(bookId);

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
