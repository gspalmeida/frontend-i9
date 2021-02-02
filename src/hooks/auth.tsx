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
  avatar: string;
}

interface AuthState {
  token: string;
  provider: ProviderProps;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  provider: ProviderProps;
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
      const provider = localStorage.getItem('@i9:provider');

      if (token && provider) {
        setData({
          token: token,
          provider: JSON.parse(provider),
        });
        api.defaults.headers.Authorization = `Bearer ${token}`;
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

    const { token, parsedProvider: provider, initialRoute } = response.data;

    console.log(response.data);

    localStorage.setItem('@i9:token', token);
    localStorage.setItem('@i9:provider', JSON.stringify(provider));
    localStorage.setItem('@i9:initialRoute', JSON.stringify(initialRoute));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setData({ token, provider });
    window.location.reload();
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@i9:token');
    localStorage.removeItem('@i9:provider');
    localStorage.removeItem('@i9:initialRoute');
    api.defaults.headers.Authorization = undefined;
    window.location.reload();
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        provider: data.provider,
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
