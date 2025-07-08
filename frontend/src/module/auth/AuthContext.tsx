
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Definimos el tipo del contexto incluyendo logout
interface AuthContextType {
  token: string | null;
  login: (tokenLogin: string) => void;
  logout: () => void; // ✅ agregar logout
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenStored = localStorage.getItem("Token");
    if (tokenStored) {
      setToken(tokenStored);
    }
  }, []);

  const login = (tokenLogin: string) => {
    setToken(tokenLogin);
    localStorage.setItem("Token", tokenLogin);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("Token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
  }
  return context;
}
