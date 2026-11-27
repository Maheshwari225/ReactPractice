import { createContext, useContext, useState } from 'react';

// 1. Create the Context
const ThemeContext = createContext();

export default function Appcontext() {
  // 2. Store the dynamic value in useState
  const [theme, setTheme] = useState('light');

  return (
    // 3. Pass BOTH the state and the updater function in the value prop
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ padding: '20px' }}>
        <h2>Context + Dropdown Demo</h2>
        <ThemeDropdown />
        <DisplayCard />
      </div>
    </ThemeContext.Provider>
  );
}

// Child 1: Updates the context using a <select> dropdown
function ThemeDropdown() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <label>
      Choose Theme:{' '}
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="blue">Ocean Blue</option>
        <option value="green">Forest Green</option>
        <option value="pink">Pink</option>
      </select>
    </label>
  );
}

// Child 2: Reads the updated context automatically
function DisplayCard() {
  const { theme } = useContext(ThemeContext);

  const styles = {
    light: { background: '#f4f4f4', color: '#222' },
    dark: { background: '#222', color: '#fff' },
    blue: { background: '#005f73', color: '#e9d8a6' },
    green: { background: '#0a962f', color: '#94d2bd' },
    pink: { background: '#ffb6b9', color: '#6a0572' },
  };

  return (
    <div style={{ ...styles[theme], padding: '20px', marginTop: '15px' }}>
      Current active theme: <strong>{theme}</strong>
    </div>
  );
}