/**
 * Décoder un token JWT sans librairie externe (pour le navigateur).
 * Attention : Ne vérifie pas la signature ! Utiliser seulement les données décodées.
 */
export function decodeJWT(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erreur lors du décodage du token :', error);
    return null;
  }
}

/**
 * Vérifie si le token est expiré
 */
export function isTokenExpired(token: string): boolean {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;
    
    // JWT exp est en secondes, Date.now() en ms
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
}
