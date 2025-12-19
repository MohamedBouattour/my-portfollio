const API_ROOT = import.meta.env.VITE_API_URL || 'https://my-porfollio-backend.onrender.com/api';

interface RequestOptions extends RequestInit {
  json?: any;
}

/**
 * Wrapper générique autour de fetch pour gérer automatiquement :
 * - Les headers (Content-Type)
 * - L'authentification (Bearer Token)
 * - Le parsing JSON
 * - Les erreurs HTTP
 */
export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { json, headers, ...customConfig } = options;
  
  // Récupération du token (ajustez selon votre stockage : localStorage, cookie, etc.)
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

  try {
    const response = await fetch(`${API_ROOT}${endpoint}`, config);
    const data = await response.json();

    if (response.ok) {
        return data as T;
    } else {
        // Gestion centralisée des erreurs 401 (Non autorisé)
        if (response.status === 401) {
            // Optionnel : Déclencher un événement de logout ou rediriger
            console.warn('Session expirée ou invalide');
            // window.dispatchEvent(new Event('auth:logout'));
        }
        return Promise.reject(data.message || `Erreur ${response.status}`);
    }
  } catch (error) {
      return Promise.reject(error instanceof Error ? error.message : 'Erreur réseau inconnue');
  }
}
