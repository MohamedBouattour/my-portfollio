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

export default function Projects() {
  const [projects] = useState(projectsMock);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {project.title}
            </h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
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
        ))}
      </div>
    </div>
  );
}
