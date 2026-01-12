
import React from 'react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlay }) => {
  return (
    <div className="relative h-[56.25vw] max-h-[85vh] w-full">
      <img 
        src={movie.thumbnail} 
        alt={movie.title} 
        className="w-full h-full object-cover brightness-[0.7]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent" />
      
      <div className="absolute bottom-[10%] md:bottom-[20%] left-4 md:left-12 max-w-xl space-y-4">
        <h2 className="text-4xl md:text-7xl font-bold">{movie.title}</h2>
        <p className="text-sm md:text-lg text-gray-200 line-clamp-3 md:line-clamp-none">
          {movie.description}
        </p>
        
        <div className="flex items-center space-x-4 pt-4">
          <button 
            onClick={() => onPlay(movie)}
            className="bg-white text-black px-6 md:px-10 py-2 md:py-3 rounded flex items-center space-x-2 font-bold hover:bg-white/90 transition"
          >
            <i className="fa-solid fa-play"></i>
            <span>Play</span>
          </button>
          <button className="bg-gray-500/50 text-white px-6 md:px-10 py-2 md:py-3 rounded flex items-center space-x-2 font-bold hover:bg-gray-500/30 transition">
            <i className="fa-solid fa-circle-info text-xl"></i>
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
