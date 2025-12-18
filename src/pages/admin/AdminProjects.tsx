import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://my-porfollio-backend.onrender.com/api'; // Adjust to your backend URL

export default function AdminProjects() {
  const [projects, setProjects] = useState<any>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
  });

  // Get token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/projects`);
      const data = await response.json();

      if (response.ok) {
        setProjects(data.projects);
      } else {
        setError(data.message || 'Failed to load projects');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleAddProject(e) {
    e.preventDefault();
    setError(null);

    if (formData.title.trim() === '') {
      setError('Please enter a project title');
      return;
    }

    try {
      setLoading(true);
      const token = getAuthToken();

      if (!token) {
        setError('You must be logged in as admin to add projects');
        return;
      }

      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t)
        })
      });

      const data = await response.json();

      if (response.ok) {
        setProjects([...projects, data.project]);
        setFormData({ title: '', description: '', technologies: '' });
        setShowForm(false);
      } else {
        setError(data.message || 'Failed to create project');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Add project error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = getAuthToken();

      if (!token) {
        setError('You must be logged in as admin to delete projects');
        return;
      }

      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        setError(data.message || 'Failed to delete project');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Projects</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {showForm ? 'Cancel' : '+ Add Project'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add Project Form */}
      {showForm && (
        <form
          onSubmit={handleAddProject}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter project description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Project'}
          </button>
        </form>
      )}

      {/* Loading State */}
      {loading && !showForm && (
        <div className="text-center py-8 text-gray-600">Loading projects...</div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-600">No projects yet. Add your first project!</div>
        )}

        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-start"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                <Link to={`/admin/projects/${project.id}`} className="hover:text-blue-600 hover:underline">
                  {project.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-3">{project.description}</p>
              <div className="flex gap-2 flex-wrap">
                {project.technologies?.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleDelete(project.id)}
              className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
              disabled={loading}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
