import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { 
  BellIcon, 
  UserCircleIcon, 
  Bars3Icon,
  XMarkIcon,
  CreditCardIcon,
  BanknotesIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-header-bg shadow-sm border-b border-header-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-text-primary">PrepaidCard</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors"
            >
              <ChartBarIcon className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/cards"
              className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors"
            >
              <CreditCardIcon className="w-4 h-4" />
              <span>Cards</span>
            </Link>
            <Link
              to="/transactions"
              className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors"
            >
              <BanknotesIcon className="w-4 h-4" />
              <span>Transactions</span>
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Notifications */}
            <button className="p-2 text-text-muted hover:text-text-secondary transition-colors">
              <BellIcon className="w-5 h-5" />
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-text-primary hover:text-text-secondary transition-colors"
              >
                <UserCircleIcon className="w-8 h-8" />
                <span className="hidden sm:block text-sm font-medium">
                  {user?.firstName || user?.email}
                </span>
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover rounded-md shadow-lg py-1 z-50 border border-border">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-accent"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <UserCircleIcon className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-accent"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <Cog6ToothIcon className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-accent"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-muted hover:text-text-secondary transition-colors"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-header-border py-4">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ChartBarIcon className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/cards"
                className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CreditCardIcon className="w-4 h-4" />
                <span>Cards</span>
              </Link>
              <Link
                to="/transactions"
                className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BanknotesIcon className="w-4 h-4" />
                <span>Transactions</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
