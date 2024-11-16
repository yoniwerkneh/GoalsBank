import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-primary-500/20 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 font-mono">
            <span className="text-gray-600">©</span>
            <span className="text-primary-500">{currentYear}</span>
            <span className="text-gray-800">Banking App.</span>
            <span className="text-accent-500">All</span>
            <span className="text-gray-800">rights reserved.</span>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/privacy"
              className="text-gray-600 hover:text-primary-500 transition-colors"
            >
              [ Privacy Policy ]
            </Link>
            <Link 
              to="/terms"
              className="text-gray-600 hover:text-primary-500 transition-colors"
            >
              [ Terms ]
            </Link>
            <Link 
              to="/contact"
              className="text-gray-600 hover:text-primary-500 transition-colors"
            >
              [ Contact Us ]
            </Link>
            <Link 
              to="/help"
              className="text-gray-600 hover:text-primary-500 transition-colors"
            >
              [ Help Center ]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}