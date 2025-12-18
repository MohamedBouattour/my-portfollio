import { Link, Outlet, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import du composant de protection
import { useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminProjectDetails from './pages/admin/AdminProjectDetails';
import About from './pages/visitor/About';
import Contact from './pages/visitor/Contact';
import Projects from './pages/visitor/Projects';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

// Séparer les routes dans un composant enfant pour pouvoir utiliser useAuth si besoin (optionnel ici mais propre)
function AppRoutes() {
  return (
    <Routes>
      {/* Route par défaut : redirection vers visiteur */}
      <Route path="/" element={<NavigateWrapper to="/visitor/home" />} />

      {/* Routes Visiteurs (publiques) */}
      <Route path="/visitor" element={<VisitorLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* Routes Admin (Protégées) */}
      {/* Tout ce qui est dans ce Route parent passera par ProtectedRoute */}
      <Route element={<ProtectedRoute requireAdmin={true} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/:id" element={<AdminProjectDetails />} />
        </Route>
      </Route>

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Catch all : 404 */}
      <Route path="*" element={<div className="text-center mt-10">404 - Page non trouvée</div>} />
    </Routes>
  );
}

// Petit helper pour la redirection racine
// Petit helper pour la redirection racine
function NavigateWrapper({ to }: { to: string }) {
  return <Navigate to={to} replace />;
}


function VisitorLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <VisitorHeader />
      <main className="flex-1">
        <Outlet /> {/* Les pages s'affichent ici */}
      </main>
      <VisitorFooter />
    </div>
  );
}

function VisitorHeader() {
  const { user, logout } = useAuth(); // Exemple d'utilisation du hook dans le header

  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Portfolio</h1>
        <div className="flex gap-8 items-center">
          <Link to="/visitor/home" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link to="/visitor/projects" className="text-gray-700 hover:text-blue-600 font-medium">
            Projects
          </Link>
          <Link to="/visitor/about" className="text-gray-700 hover:text-blue-600 font-medium">
            About
          </Link>
          <Link to="/visitor/contact" className="text-gray-700 hover:text-blue-600 font-medium">
            Contact
          </Link>

          {user ? (
            // Si connecté, on affiche un bouton Logout ou lien vers Admin
            <div className="flex gap-4 items-center">
              {user.role === 'admin' && (
                <Link to="/admin" className="text-blue-600 font-bold hover:underline">
                  Admin Panel
                </Link>
              )}
              <button onClick={logout} className="text-red-500 font-medium hover:underline">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

function VisitorFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300 p-8 text-center mt-16">
      <p>&copy; {year} My Portfolio. All rights reserved.</p>
    </footer>
  );
}

// ============ ADMIN LAYOUT ============
function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/visitor/home');
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader onLogout={handleLogout} />
        <main className="flex-1 overflow-auto p-8 bg-gray-50">
          <Outlet /> {/* Admin pages render here */}
        </main>
      </div>
    </div>
  );
}

function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-4">
        <Link
          to="/admin/dashboard"
          className="block hover:bg-gray-800 p-3 rounded-lg transition font-medium"
        >
          📊 Dashboard
        </Link>
        <Link
          to="/admin/projects"
          className="block hover:bg-gray-800 p-3 rounded-lg transition font-medium"
        >
          📁 Projects
        </Link>
        <Link
          to="/visitor/home"
          className="block hover:bg-gray-800 p-3 rounded-lg transition font-medium text-gray-400 mt-10"
        >
          ← Retour site vitrine
        </Link>
      </nav>
    </aside>
  );
}

function AdminHeader({ onLogout }: { onLogout: () => void }) {
  const { user } = useAuth();
  return (
    <header className="bg-white shadow-md p-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">Admin ({user?.email})</h1>
      <button
        onClick={onLogout}
        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-semibold"
      >
        Logout
      </button>
    </header>
  );
}

export default App;
