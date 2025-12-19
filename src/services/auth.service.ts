import { request } from './api';

// Définissez vos types ici ou dans src/types/auth.types.ts
export interface LoginResponse {
  token: string;
  user: {
    email: string;
    role: 'admin' | 'visitor';
  };
}

export interface LoginDTO {
  email: string;
  pass: string;
}

export const AuthService = {
    /**
     * Connecte l'utilisateur et retourne le token + infos user
     */
    login: (credentials: LoginDTO) => 
        request<LoginResponse>('/auth/login', { 
            method: 'POST', 
            json: credentials 
        }),

    /**
     * Exemple d'inscription
     */
    register: (data: any) => 
        request('/auth/register', { 
            method: 'POST', 
            json: data 
        }),
    
    /**
     * Vérification du token (si endpoint dispo)
     */
    verifyToken: () => 
        request<{valid: boolean}>('/auth/verify')
};
