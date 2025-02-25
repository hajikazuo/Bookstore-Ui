import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { createTheme } from '@mui/material/styles';
import Navigation from './Navigation';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet } from 'react-router-dom';
import { useAuthSession } from '../../hooks/auth/SessionHook';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
});

const MainLayout: React.FC = () => {
  const { session, authentication } = useAuthSession();

  return (
    <AppProvider
      branding={{
        logo: <img src="/src/assets/img/logo.svg" alt="Logo" />,
        title: 'Bookhub',
      }}
      session={session}
      authentication={authentication}
      navigation={Navigation}
      theme={theme}>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
};

export default MainLayout;
