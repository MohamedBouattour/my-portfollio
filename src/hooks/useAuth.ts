import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Hook personnalisé pour utiliser le contexte d'authentification plus facilement
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  
  return context;
}
