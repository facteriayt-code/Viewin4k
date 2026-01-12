
import React, { useRef } from 'react';
import { Movie } from '../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onSelect }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="py-8 px-4 md:px-12 group relative">
      <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
      
      <div className="relative group/row">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/50 opacity-0 group-hover/row:opacity-100 transition flex items-center justify-center hover:bg-black/70"
        >
          <i className="fa-solid fa-chevron-left text-2xl"></i>
        </button>

        <div 
          ref={rowRef}
          className="flex space-x-2 overflow-x-auto hide-scrollbar pb-4"
        >
          {movies.map((movie) => (
            <div 
              key={movie.id}
              onClick={() => onSelect(movie)}
              className="flex-none w-[180px] md:w-[280px] aspect-video cursor-pointer relative movie-card rounded-md overflow-hidden bg-zinc-900 group/card"
            >
              <img 
                src={movie.thumbnail} 
                alt={movie.title}
                className="w-full h-full object-cover rounded-md group-hover/card:brightness-50 transition"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover/card:opacity-100 transition-opacity bg-gradient-to-t from-black to-transparent">
                 <p className="text-sm font-bold truncate">{movie.title}</p>
                 <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] border border-gray-500 px-1 rounded uppercase">{movie.rating}</span>
                    <span className="text-[10px] text-gray-400">{movie.year}</span>
                 </div>
              </div>
              {movie.isUserUploaded && (
                <div className="absolute top-2 right-2 bg-red-600 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase shadow-lg">
                   User Content
                </div>
              )}
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/50 opacity-0 group-hover/row:opacity-100 transition flex items-center justify-center hover:bg-black/70"
        >
          <i className="fa-solid fa-chevron-right text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
