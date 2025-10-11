import React from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light' as const, icon: SunIcon, label: 'Light' },
    { value: 'dark' as const, icon: MoonIcon, label: 'Dark' },
    { value: 'system' as const, icon: ComputerDesktopIcon, label: 'System' },
  ];

  return (
    <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`
            flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200
            ${theme === value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }
          `}
          title={label}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
