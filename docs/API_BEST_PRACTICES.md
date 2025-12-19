# API Best Practices & Architecture Guide

This guide outlines the recommended architecture for handling API communication, token management, and type safety in the application.

## 1. Architecture Overview

Instead of making `fetch` calls directly inside components (like `AdminProjects.tsx`), we should abstract API logic into a dedicated **Service Layer**.

### Recommended Folder Structure
```
src/
├── services/           # API calls and logic
│   ├── api.ts          # Base HTTP client (fetch wrapper)
│   ├── auth.service.ts # Auth specific calls (login, register)
│   └── project.service.ts # Project resource calls
├── types/              # TS Interfaces & Zod Schemas
│   ├── api.types.ts    # Generic API responses
│   └── project.types.ts
```

## 2. Base HTTP Client (`api.ts`)

Create a reusable wrapper around `fetch` that automatically handles:
- Base URL configuration
- Request Headers (Content-Type)
- Authentication Tokens
- Error Parsing

```typescript
// src/services/api.ts

const API_ROOT = import.meta.env.VITE_API_URL || 'https://my-porfollio-backend.onrender.com/api';

interface RequestOptions extends RequestInit {
  json?: any;
}

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { json, headers, ...customConfig } = options;
  
  const token = localStorage.getItem('token');
  
  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (json) {
    config.body = JSON.stringify(json);
  }

  const response = await fetch(`${API_ROOT}${endpoint}`, config);
  const data = await response.json();

  if (response.ok) {
    return data as T;
  } else {
    // Handle 401 specifically if needed (e.g., auto-logout)
    if (response.status === 401) {
       // window.location.href = '/login'; // simplified redirect
    }
    return Promise.reject(data.message || 'Something went wrong');
  }
}
```

## 3. Service Modules

Grouping API calls by resource.

### Example: Project Service

```typescript
// src/services/project.service.ts
import { request } from './api';
import type { Project, CreateProjectDTO } from '../types/project.types';

export const ProjectService = {
  getAll: () => request<{ projects: Project[] }>('/projects'),
  
  create: (data: CreateProjectDTO) => 
    request<{ project: Project }>('/projects', { method: 'POST', json: data }),
  
  delete: (id: string) => 
    request<{ message: string }>(\`/projects/\${id}\`, { method: 'DELETE' })
};
```

## 4. Type Safety & Schemas

Use TypeScript interfaces for compile-time checks and **Zod** for runtime validation (optional but recommended for robust apps).

### TypeScript Interfaces

```typescript
// src/types/project.types.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  createdAt: string;
}

export interface CreateProjectDTO {
  title: string;
  description: string;
  technologies: string[];
}
```

### Zod Schema Validation (New Recommended Standard)

```typescript
import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  technologies: z.array(z.string())
});

export type Project = z.infer<typeof ProjectSchema>;
```

## 5. Usage in Components

After implementing the service layer, your components become much cleaner.

**Before (AdminProjects.tsx):**
```typescript
async function handleAddProject(e) {
  // ... manual fetch setup ...
  const response = await fetch(`${API_URL}/projects`, {
     headers: { 'Authorization': ... }
  });
  // ... error handling ...
}
```

**After (Refactored):**
```typescript
import { ProjectService } from '../../services/project.service';

async function handleAddProject(e) {
  try {
    const { project } = await ProjectService.create(formData);
    setProjects([...projects, project]);
  } catch (err) {
    setError(err); // Centralized error from api.ts
  }
}
```

## 6. Token & Auth Best Practices

- **Storage**: 
  - `localStorage`: Easiest for JWT, but vulnerable to XSS.
  - `HttpOnly Cookies`: Most secure, prevents XSS reading the token. Requires backend support to set cookies.
  
- **Current Pattern**: We are using `localStorage` for simplicity.
- **Header Injection**: Handled automatically in `api.ts`.
- **Expiration**: Handle `401 Unauthorized` responses in `api.ts` to clear local storage and redirect to login.

```typescript
// in api.ts
if (response.status === 401) {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('auth:logout')); // Notify app to redirect
}
```
