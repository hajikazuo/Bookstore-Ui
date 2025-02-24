import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle'; 
import ListIcon from '@mui/icons-material/List'; 

import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';

import { type Navigation } from '@toolpad/core/AppProvider';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'homepage',
    title: 'HomePage',
    icon: <HomeIcon />,
  },
  {
    segment: 'books',
    title: 'Books',
    icon: <BookIcon />,
    children: [
      {
        segment: 'list',
        title: 'List Books',
        icon: <ListIcon />, 
      },
      {
        segment: 'add',
        title: 'Add Book',
        icon: <AddCircleIcon />, 
      },
    ],
  },
  {
    segment: 'clients',
    title: 'Clients',
    icon: <PersonIcon />,
    children: [
      {
        segment: 'list-clients',
        title: 'List Clients',
        icon: <ListIcon />, 
      },
      {
        segment: 'add-client',
        title: 'Add Client',
        icon: <AddCircleIcon />, 
      },
    ],
  },
  {
    segment: 'loans',
    title: 'Loans',
    icon: <LibraryBooksIcon />, 
    children: [
      {
        segment: 'list-loans',
        title: 'List Loans',
        icon: <ListIcon />, 
      },
      {
        segment: 'add-loan',
        title: 'Add Loan',
        icon: <AddCircleIcon />, 
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    kind: 'header',
    title: 'Administration',
  },
  {
    segment: 'user-accounts',
    title: 'User Accounts',
    icon: <AccountCircleIcon />,
  },
];

export default NAVIGATION;
