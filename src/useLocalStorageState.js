import { useState, useEffect } from "react";

// initialState is []: the default value to use if nothing is saved to the localStorage.
// key: the localStorage key where the value will be stored.
export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function() {
// Get the value from localStorage using the provided key. If there is a value, parse it from JSON (convert to JavaScript object/Value) and return it. If there is no value, return the initialState.
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(function() {
  // Every time the value or key changes, save the current value into localStorage under the provided key. 
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  
  // Every time the state changes, the new value is saved (updated) to localStorage.
   return [value, setValue];
}

