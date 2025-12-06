import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
// Pages

import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import About from './pages/visitor/About';
import Contact from './pages/visitor/Contact';
import Projects from './pages/visitor/Projects';

const isAuthenticated = true
const isAdmin = true

function App() {
  return (
      <Routes>
      {/* Visitor routes with layout */}
      <Route path="/visitor" element={<VisitorLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route  path="projects" element={<Projects />} />
        <Route  path="Contact" element={<Contact />} />
        <Route  path="About" element={<About />} />
      </Route>

       {/* Admin routes with layout */}
       {
        isAdmin && 
        <Route path="/admin" element={<AdminLayout />}>
          <Route index path='' element={<AdminDashboard />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
      </Route>
       }
       

      {/* Login standalone */}
      <Route path="/login" element={<Login isAuthenticated={isAuthenticated} isAdmin={isAdmin} />} />

      <Route path="*" element={<Login isAuthenticated={isAuthenticated} isAdmin={isAdmin} />} />
    </Routes>
  );
}

function VisitorLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <VisitorHeader />
      <main className="flex-1">
        <Outlet /> {/* Pages render here */}
      </main>
      <VisitorFooter />
    </div>
  );
}

function VisitorHeader() {
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
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Admin
          </Link>
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
  const navigate = useNavigate();

  const handleLogout = () => {
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
      </nav>
    </aside>
  );
}

function AdminHeader({ onLogout }:any) {
  return (
    <header className="bg-white shadow-md p-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
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