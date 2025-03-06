import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">My Store</Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
            >
              Dashboard
            </Link>
            <Link
              to="/products"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
            >
              Products
            </Link>
            <Link
              to="/users"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
            >
              Users
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;