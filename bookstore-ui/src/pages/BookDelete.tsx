import { useNavigate, useParams } from 'react-router-dom';
import { useGetBookById } from '../hooks/books/GetBookHook';
import { Paper, Typography, Box, CircularProgress, Button, ButtonGroup } from '@mui/material';
import Breadcrumb from '../components/layout/BreadCrumb';
import useDeleteBook from '../hooks/books/DeleteBookHook';

const BookDelete = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { loading, error, book } = useGetBookById(bookId || '');
  const navigate = useNavigate();
  const { handleDeleteBook } = useDeleteBook();

  const handleConfirmDelete = async () => {
    if (bookId) {
      await handleDeleteBook(bookId, () => {
        navigate("/books/list");
      });
    }
  };

  const handleCancel = () => {
    navigate("/books/list");
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Books' },
          { label: 'Book delete' },
        ]}
      />
      <Paper sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          Are you sure you want to delete this book?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          This action cannot be undone.
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
        <ButtonGroup variant="contained" aria-label="book actions" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Confirm
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </ButtonGroup>
      </Paper>
    </Box>
  );
};

export default BookDelete;