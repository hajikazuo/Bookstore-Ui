import { useParams } from 'react-router-dom';
import { useGetBookById } from '../hooks/books/GetBookHook';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import Breadcrumb from '../components/layout/BreadCrumb';

const BookDetails = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const { loading, error, book } = useGetBookById(bookId || '');

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ padding: 3 }}>
            <Breadcrumb
                paths={[
                    { label: 'Home', href: '/' },
                    { label: 'Books' },
                    { label: 'Book details' },
                ]}
            />
            <Paper sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Book Details
                </Typography>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3}>
                    <Box flex={1}>
                        <Typography variant="h6">Title:</Typography>
                        <Typography variant="body1">{book?.title}</Typography>
                    </Box>
                    <Box flex={1}>
                        <Typography variant="h6">Author:</Typography>
                        <Typography variant="body1">{book?.author}</Typography>
                    </Box>
                </Box>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3} mt={2}>
                    <Box flex={1}>
                        <Typography variant="h6">Publisher:</Typography>
                        <Typography variant="body1">{book?.publisher}</Typography>
                    </Box>
                    <Box flex={1}>
                        <Typography variant="h6">Year:</Typography>
                        <Typography variant="body1">{book?.year}</Typography>
                    </Box>
                </Box>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3} mt={2}>
                    <Box flex={1}>
                        <Typography variant="h6">Edition:</Typography>
                        <Typography variant="body1">{book?.edition}</Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default BookDetails;
