import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserCircle, LogOut, Target, Send, LineChart, Settings } from 'lucide-react';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: Target, label: 'Goals', path: '/goals' },
    { icon: Send, label: 'Transfer', path: '/transfer' },
    { icon: LineChart, label: 'Insights', path: '/insights' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="bg-dark-900 border-b border-primary-500/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500">
                <Target className="w-5 h-5 text-white transform -rotate-12 animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Goals
              </span>
            </Link>

            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-6">
                {navItems.map(({ icon: Icon, label, path }) => (
                  <Link
                    key={path}
                    to={path}
                    className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors"
                >
                  <UserCircle className="w-5 h-5" />
                  <span className="hidden md:inline">{user?.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-400 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}