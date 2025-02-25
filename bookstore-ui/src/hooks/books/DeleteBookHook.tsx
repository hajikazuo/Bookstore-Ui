import { deleteBook } from "../../api/endpoints/BookApi";

const useDeleteBook = () => {
  const handleDeleteBook = async (bookId: string, onSuccess?: () => void) => {
    try {
      await deleteBook(bookId); 
      if (onSuccess) {
        onSuccess(); 
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book");
    }
  };

  return { handleDeleteBook }; 
};

export default useDeleteBook;