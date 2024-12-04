'use client';

import { useEffect, useState } from 'react';

function ThemeToggles() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<string>(() =>
    typeof window !== 'undefined' ? document.documentElement.getAttribute('data-theme') || 'light' : 'light'
  );

  // The active theme is not available on the server.
  // If you have styling that is conditionally applied based on the active-theme,
  // you have to await the mounted state before rendering the active theme.
  useEffect(() => setMounted(true), []);

  const themeMapping: Record<string, string> = {
    light: 'Default',
    'dark-classic': 'Dark',
    tangerine: 'Tangerine',
    'dark-tangerine': 'Tangerine (dark)',
    mint: 'Mint',
    'dark-mint': 'Mint (dark)',
  };

  useEffect(() => {
    if(localStorage) {
      const themeCurrent = localStorage.getItem('theme')
      if(themeCurrent !== null) {
        setTheme(themeCurrent)
        document.documentElement.setAttribute('data-theme', themeCurrent);
      }
    }
  }, [])
  

  const handleThemeChange = (selectedTheme: string) => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme)
    setTheme(selectedTheme);
  };

  return (
    <div>
      <p className="text-center w-full font-semibold rounded-md transition-colors duration-200 mb-2 bg-primary-foreground text-primary">Theme</p>
      <div className=" flex flex-col gap-2">
        {Object.entries(themeMapping).map(([key, value]) => (
          <button
            key={key}
            className={`font-semibold rounded-md transition-colors duration-200 ${
              // The theme is only available after the component is mounted.
              mounted && theme === key
                ? 'border border-primary bg-primary-foreground text-primary'
                : 'bg-primary text-primary-foreground'
            }`}
            onClick={() => handleThemeChange(key)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeToggles;
