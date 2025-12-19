import { request } from './api';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}

export const ProjectService = {
  getAll: () => request<{ projects: Project[] }>('/projects'),
  
  create: (data: Partial<Project>) => 
    request<{ project: Project }>('/projects', { method: 'POST', json: data }),
  
  delete: (id: string) => 
    request<{ message: string }>(`/projects/${id}`, { method: 'DELETE' }),

  getOne: (id: string) => 
    request<{ project: Project }>(`/projects/${id}`)
};
