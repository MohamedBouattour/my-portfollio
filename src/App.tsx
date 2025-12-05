import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
// Pages

import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <>
      <Routes>
        {/* CLIENT ROUTES */}
        <Route
          path="/"
          element={<ClientLayout isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
        >
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
        />

        {/* ADMIN ROUTES */}
        {isAdmin && (
          <Route
            path="/admin"
            element={<AdminLayout isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
          >
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
          </Route>
        )}

        {/* FALLBACK */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

function ClientLayout({ isAdmin }: any) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md p-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Portfolio</h1>
          <div className="flex gap-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/projects" className="text-gray-700 hover:text-blue-600">
              Projects
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            {!isAdmin && (
              <Link to="/login" className="text-blue-600 font-bold">
                Admin
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <Home />
      </main>
      <footer className="bg-gray-900 text-white p-8 text-center">
        <p>&copy; 2024 My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}

function AdminLayout({ setIsAdmin }: any) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin" className="block hover:bg-gray-800 p-2 rounded">
            Dashboard
          </Link>
          <Link
            to="/admin/projects"
            className="block hover:bg-gray-800 p-2 rounded"
          >
            Projects
          </Link>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              setIsAdmin(false);
              window.location.href = '/';
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </header>
        <main className="flex-1 overflow-auto p-8">
          <AdminDashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
