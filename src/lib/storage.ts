// Utilities to manage localStorage with error handling

export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`localStorage read error for ${key}:`, error);
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`localStorage write error for ${key}:`, error);
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`localStorage remove error for ${key}:`, error);
  }
}
