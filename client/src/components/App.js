import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Toaster } from 'react-hot-toast';

import styled from 'styled-components/macro';
import { GlobalStyle } from '../styles';

import LoginPage from './LoginPage';
import Profile from './Profile';
import ErrorBoundary from './ErrorBoundary';

import { EventBus } from '../utils';
import { getAccessToken, clearTokensCache, axiosInstance } from '../services';

const AppContainer = styled.div`
  height: 100%;
  min-height: 100%;
`;

export default function App() {
  const { headers } = axiosInstance.defaults;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { hash } = useLocation();
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const token = getAccessToken(hash);
    setAccessToken(token);
    headers.common.Authorization = `Bearer ${token}`;
    navigate('/');
  }, []);

  EventBus.on('logout', () => {
    setAccessToken('');
    clearTokensCache();
    queryClient.removeQueries();
  });

  return (
    <AppContainer>
      <GlobalStyle />
      <ErrorBoundary>
        {accessToken ? <Profile /> : <LoginPage />}
        <Toaster position="bottom-left" reverseOrder={false} />
      </ErrorBoundary>
    </AppContainer>
  );
}
