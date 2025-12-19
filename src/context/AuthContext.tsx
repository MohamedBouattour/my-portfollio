import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import { decodeJWT, isTokenExpired } from '../utils/jwt';

// Définition du type pour l'utilisateur
interface User {
  id?: string;
  email: string;
  name?: string;
  role: 'admin' | 'visitor';
}

// Définition du type pour le contexte
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string, userData?: User) => void;
  logout: () => void;
}

// Création du contexte
export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Vérification du token au chargement
    const token = localStorage.getItem('token');
    if (token) {
      if (isTokenExpired(token)) {
        logout();
      } else {
        const decoded = decodeJWT(token);
        // On map les champs du token vers notre objet User
        // Le token contient { id, email, name, role, iat, exp }
        setUser({
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          role: decoded.role || 'visitor'
        });
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decoded = decodeJWT(token);
    const newUser: User = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role || 'visitor'
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
