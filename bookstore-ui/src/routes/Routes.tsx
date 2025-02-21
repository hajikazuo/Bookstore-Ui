import { Navigate, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import MainLayout from '../components/layout/MainLayout';
import BooksPage from '../pages/BookList';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="*" element={<Navigate to="/Homepage" />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/booklist" element={<BooksPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;