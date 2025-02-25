import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/endpoints/AuthApi';
import { useAuth } from '../../contexts/AuthContext';

export const useAuthSession = () => {
  const { email, updateAuthState } = useAuth();
  const navigate = useNavigate();

  const [session, setSession] = React.useState({
    user: {
      email: email || '',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            email: email || '',
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      },
      signOut: () => {
        logout();
        updateAuthState();
        navigate('/login');
      },
    };
  }, [email, updateAuthState, navigate]);

  return { session, authentication };
};