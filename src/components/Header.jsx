// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-teal-500 p-4">
      <nav className="flex justify-between items-center">
        <div className="text-white text-xl font-bold me-10">
          <Link to="/" >CANSAT - Prometeo</Link>
        </div>
        <ul className="flex space-x-4 me-auto">
          <li>
            <Link to="/" className="text-white hover:bg-teal-700 hover:text-gray-300 p-1 rounded">Home</Link>
          </li>
          <li>
            <Link to="/ia" className="text-white hover:bg-teal-700 hover:text-gray-300 p-1 rounded">Ia</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

