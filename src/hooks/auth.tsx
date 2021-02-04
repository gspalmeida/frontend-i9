import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import api from '../services/api';

interface ProviderProps {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AdminProps {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  token: string;
  provider?: ProviderProps;
  admin?: AdminProps;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  admin?: AdminProps;
  provider?: ProviderProps;
  loading: boolean;
  signIn(credentials: SingInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const token = localStorage.getItem('@i9:token');
      const admin = localStorage.getItem('@i9:admin');
      const provider = localStorage.getItem('@i9:provider');

      if (provider !== 'undefined' && provider && token) {
        setData({
          token: token,
          provider: JSON.parse(provider),
        });
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setLoading(false);
      }
      if (admin !== 'undefined' && admin && token) {
        setData({
          token: token,
          admin: JSON.parse(admin),
        });
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setLoading(false);
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('auth', {
      email,
      password,
    });

    const { token, provider, admin } = response.data;
    
    localStorage.setItem('@i9:token', token);
    localStorage.setItem('@i9:provider', JSON.stringify(provider));
    localStorage.setItem('@i9:admin', JSON.stringify(admin));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setData({ token, provider, admin });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@i9:token');
    localStorage.removeItem('@i9:provider');
    localStorage.removeItem('@i9:admin');
    api.defaults.headers.Authorization = undefined;
    window.location.reload();
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        provider: data.provider,
        admin: data.admin,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    console.error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
