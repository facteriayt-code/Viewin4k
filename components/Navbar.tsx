
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onUploadClick: () => void;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onUploadClick, onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 px-4 md:px-12 py-4 flex items-center justify-between ${isScrolled ? 'bg-black' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center space-x-8">
        <h1 className="text-red-600 text-2xl md:text-3xl font-black tracking-tighter uppercase cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          VIEW <span className="text-white">4K</span>
        </h1>
        <div className="hidden lg:flex space-x-6 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">TV Shows</a>
          <a href="#" className="hover:text-white transition">Movies</a>
          <a href="#" className="hover:text-white transition">New & Popular</a>
          <a href="#" className="hover:text-white transition">My List</a>
        </div>
      </div>

      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="relative group">
          <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Titles, people, genres"
            className="bg-black/50 border border-gray-600 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-white w-32 md:w-64 transition-all"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <button 
          onClick={onUploadClick}
          className="bg-white/10 hover:bg-white/20 text-white border border-gray-600 rounded-lg px-3 py-1.5 text-sm font-medium flex items-center space-x-2 transition"
        >
          <i className="fa-solid fa-cloud-arrow-up"></i>
          <span className="hidden sm:inline">Upload</span>
        </button>

        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-xs font-bold cursor-pointer">
          JD
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
