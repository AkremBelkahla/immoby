import { useState, useEffect } from "react";
import { getItem, setItem } from "@/lib/storage";

// Hook générique pour persister un état dans localStorage
export function useLocalStore<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = getItem<T>(key);
    return stored !== null ? stored : initialValue;
  });

  useEffect(() => {
    setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
