import Box from '@mui/material/Box';
import Breadcrumb from '../components/layout/BreadCrumb';

const Homepage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Welcome' }, 
        ]}
      />
      <h1>Welcome to the App</h1>
    </Box>
  );
};

export default Homepage;
