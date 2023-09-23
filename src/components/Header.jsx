// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navOptions } from '../assets/constants';

export const Header = () => {
  const [options, setOptions] = useState(navOptions)

  return (
    <header className="bg-teal-500 p-4 sticky">
      <nav className="flex justify-between items-center">
        <div className="text-white text-xl font-bold me-10">
          <Link to="/" >CANSAT - Prometeo</Link>
        </div>
        <ul className="flex space-x-4 me-auto">
          {
            options.map(item =>
              <li key = {item.id}>
                <Link to={item.href} className="text-white hover:bg-teal-700 hover:text-gray-300 p-1 rounded">{item.text}</Link>

              </li>
            )
          }
        </ul>
      </nav>
    </header>
  );
};

