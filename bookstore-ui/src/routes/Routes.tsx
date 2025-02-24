import { Navigate, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import MainLayout from '../components/layout/MainLayout';
import BookList from '../pages/BookList';
import BookAdd from '../pages/BookAdd';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="*" element={<Navigate to="/homepage" />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/books/list" element={<BookList />} />
                <Route path="/books/add" element={<BookAdd/>} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;