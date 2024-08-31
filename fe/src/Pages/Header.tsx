import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        RB-Digital
      </div>
      <nav className="space-x-4">
        <Link to="/home" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/books" className="hover:text-gray-300">
          Books
        </Link>
        <Link to="/collection" className="hover:text-gray-300">
          Collection
        </Link>
        <Link to="/profile" className="hover:text-gray-300">
          Profile
        </Link>
      </nav>
    </header>
  );
};

export default Header;
