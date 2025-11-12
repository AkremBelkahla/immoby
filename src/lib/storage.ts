// Utilitaires pour gérer localStorage avec gestion d'erreurs

export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Erreur lecture localStorage pour ${key}:`, error);
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Erreur écriture localStorage pour ${key}:`, error);
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Erreur suppression localStorage pour ${key}:`, error);
  }
}
