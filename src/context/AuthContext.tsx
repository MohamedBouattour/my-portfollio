import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';

// Définition du type pour l'utilisateur
interface User {
  email: string;
  role: 'admin' | 'visitor';
}

// Définition du type pour le contexte
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean; // Helper pour vérifier facilement si admin
  login: (userData: User) => void;
  logout: () => void;
}

// Création du contexte avec une valeur par défaut nulle
export const AuthContext = createContext<AuthContextType | null>(null);

// Hook personnalisée exportée directement avec le contexte
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
}

// Provider qui va envelopper l'application
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Au démarrage, on vérifie si un utilisateur est déjà stocké (Optionnel pour l'exercice, mais bonne pratique simplifiée)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Calculer les états dérivés
  const isAuthenticated = !!user; // true si user existe
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
