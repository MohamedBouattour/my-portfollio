import { useState } from 'react';

const projectsMock = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce with React & Node.js',
    technologies: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Social Media Dashboard',
    description: 'Real-time analytics dashboard',
    technologies: ['React', 'Chart.js', 'Firebase'],
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Collaborative task management',
    technologies: ['React', 'TypeScript', 'PostgreSQL'],
  },
];

export default function AdminProjects() {
  const [projects, setProjects] = useState(projectsMock);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleAddProject(e) {
    e.preventDefault();

    if (formData.title.trim() === '') {
      alert('Please enter a project title');
      return;
    }

    const newProject = {
      id: Math.max(...projects.map((p) => p.id), 0) + 1,
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies.split(',').map((t) => t.trim()),
    };

    setProjects([...projects, newProject]);
    setFormData({ title: '', description: '', technologies: '' });
    setShowForm(false);
  }

  function handleDelete(id) {
    setProjects(projects.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Projects</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : '+ Add Project'}
        </button>
      </div>

      {/* Add Project Form */}
      {showForm && (
        <form
          onSubmit={handleAddProject}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter project description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700"
          >
            Add Project
          </button>
        </form>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-start"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-3">{project.description}</p>
              <div className="flex gap-2 flex-wrap">
                {project.technologies.map((tech, i) => (
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
              className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
