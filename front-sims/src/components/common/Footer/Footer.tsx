import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Student Information Management System
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-sm text-gray-600 hover:text-accent">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-accent">Terms of Service</a>
            <a href="#" className="text-sm text-gray-600 hover:text-accent">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;