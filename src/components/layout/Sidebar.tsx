import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChartBarIcon,
  CreditCardIcon,
  BanknotesIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  // HomeIcon,
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    { name: 'Cards', href: '/cards', icon: CreditCardIcon },
    { name: 'Transactions', href: '/transactions', icon: BanknotesIcon },
    { name: 'Profile', href: '/profile', icon: UserCircleIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:pb-0 lg:bg-sidebar-bg lg:border-r lg:border-sidebar-border transition-colors duration-200">
      <div className="flex-1 flex flex-col min-h-0">
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-accent text-accent-foreground border-r-2 border-primary'
                    : 'text-text-secondary hover:bg-accent hover:text-accent-foreground'
                }`
              }
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  window.location.pathname === item.href
                    ? 'text-primary'
                    : 'text-text-muted group-hover:text-text-secondary'
                }`}
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
