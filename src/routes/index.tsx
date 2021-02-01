import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const {provider, loading } = useAuth();

  if (loading) {
    return (
      <div style={{flex:1, backgroundColor:'red'}}><p>Carregando</p></div>
    );
  }
  return provider ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
