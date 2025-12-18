import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Props pour le composant (optionnel : on peut restreindre par rôle)
interface ProtectedRouteProps {
    requireAdmin?: boolean; // Si true, seul l'admin peut accéder
}

export default function ProtectedRoute({ requireAdmin = false }: ProtectedRouteProps) {
    const { isAuthenticated, isAdmin } = useAuth(); // On récupère l'info du contexte

    // 1. Si l'utilisateur n'est pas connecté du tout -> Redirection vers Login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 2. Si la route demande d'être Admin mais que l'user ne l'est pas -> Redirection vers l'accueil visiteur
    if (requireAdmin && !isAdmin) {
        return <Navigate to="/visitor/home" replace />;
    }

    // 3. Tout est bon, on affiche la page demandée (Outlet)
    return <Outlet />;
}
