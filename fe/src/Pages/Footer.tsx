import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 RB-Digital. All rights reserved.</p>
        <p>
          Made with <span className="text-red-500">&hearts;</span> by RB-Digital Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;
