import { useState, useCallback } from 'react';

let nextId = 1;

export function useWindowManager() {
  const [windows, setWindows] = useState([]);
  const [topZ, setTopZ] = useState(200);

  const openWindow = useCallback((config) => {
    const id = nextId++;
    const z  = topZ + 1;
    setTopZ(z);
    setWindows(prev => [
      ...prev,
      { id, zIndex: z, x: 60 + (id % 6) * 28, y: 40 + (id % 5) * 24, ...config },
    ]);
    return id;
  }, [topZ]);

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const focusWindow = useCallback((id) => {
    setTopZ(prev => {
      const z = prev + 1;
      setWindows(ws => ws.map(w => w.id === id ? { ...w, zIndex: z } : w));
      return z;
    });
  }, []);

  const moveWindow = useCallback((id, x, y) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  }, []);

  return { windows, openWindow, closeWindow, focusWindow, moveWindow };
}
