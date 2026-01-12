
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import VideoPlayer from './components/VideoPlayer';
import UploadModal from './components/UploadModal';
import { Movie, UploadFormData } from './types';
import { INITIAL_MOVIES, CATEGORIES } from './constants';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('view_4k_movies');
    return saved ? JSON.parse(saved) : INITIAL_MOVIES;
  });
  
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroMovie, setHeroMovie] = useState<Movie>(INITIAL_MOVIES[0]);

  // Save to local storage whenever movies change
  useEffect(() => {
    localStorage.setItem('view_4k_movies', JSON.stringify(movies));
  }, [movies]);

  const filteredMovies = useMemo(() => {
    if (!searchQuery) return movies;
    return movies.filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [movies, searchQuery]);

  const handleUpload = (data: UploadFormData) => {
    const newMovie: Movie = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail || 'https://picsum.photos/seed/default/800/450',
      videoUrl: data.video || undefined,
      category: 'My Uploads',
      rating: 'PG-13',
      year: new Date().getFullYear().toString(),
      isUserUploaded: true
    };
    
    setMovies(prev => [newMovie, ...prev]);
    setIsUploadOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600/30">
      <Navbar 
        onUploadClick={() => setIsUploadOpen(true)} 
        onSearch={setSearchQuery} 
      />

      {/* Conditional Rendering of Content */}
      <main className="pb-24">
        {searchQuery ? (
          <div className="pt-24 min-h-screen">
            <h2 className="px-12 text-2xl font-bold mb-8 text-gray-400">
              Showing results for: <span className="text-white italic">"{searchQuery}"</span>
            </h2>
            <div className="px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
               {filteredMovies.map(movie => (
                 <div 
                  key={movie.id} 
                  onClick={() => setSelectedMovie(movie)}
                  className="aspect-video relative rounded overflow-hidden cursor-pointer movie-card bg-zinc-900"
                >
                   <img src={movie.thumbnail} alt={movie.title} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-2">
                      <p className="text-sm font-bold truncate">{movie.title}</p>
                   </div>
                 </div>
               ))}
               {filteredMovies.length === 0 && (
                 <div className="col-span-full py-20 text-center space-y-4">
                    <i className="fa-solid fa-magnifying-glass text-6xl text-zinc-800"></i>
                    <p className="text-zinc-500">Your search did not have any matches.</p>
                 </div>
               )}
            </div>
          </div>
        ) : (
          <>
            <Hero movie={heroMovie} onPlay={setSelectedMovie} />
            
            <div className="-mt-16 md:-mt-32 relative z-10 space-y-2 md:space-y-8">
              {CATEGORIES.map(category => {
                const categoryMovies = movies.filter(m => 
                  category === 'My Uploads' ? m.isUserUploaded : m.category === category
                );
                
                return (
                  <MovieRow 
                    key={category}
                    title={category === 'My Uploads' ? 'Your Personal Collection' : `${category} on View 4K`}
                    movies={categoryMovies}
                    onSelect={setSelectedMovie}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* Footer Info */}
      <footer className="border-t border-zinc-800 py-12 px-12 text-zinc-500 text-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
           <div className="space-y-4 flex flex-col">
              <span className="text-zinc-400 font-bold mb-2">Company</span>
              <a href="#" className="hover:underline">About Us</a>
              <a href="#" className="hover:underline">Careers</a>
              <a href="#" className="hover:underline">Press</a>
           </div>
           <div className="space-y-4 flex flex-col">
              <span className="text-zinc-400 font-bold mb-2">Help</span>
              <a href="#" className="hover:underline">Account</a>
              <a href="#" className="hover:underline">Terms of Use</a>
              <a href="#" className="hover:underline">Privacy</a>
           </div>
           <div className="space-y-4 flex flex-col">
              <span className="text-zinc-400 font-bold mb-2">Connect</span>
              <div className="flex space-x-4 text-xl">
                 <i className="fa-brands fa-facebook hover:text-white cursor-pointer"></i>
                 <i className="fa-brands fa-instagram hover:text-white cursor-pointer"></i>
                 <i className="fa-brands fa-twitter hover:text-white cursor-pointer"></i>
                 <i className="fa-brands fa-youtube hover:text-white cursor-pointer"></i>
              </div>
           </div>
           <div className="space-y-4 flex flex-col">
              <span className="text-zinc-400 font-bold mb-2">Service Code</span>
              <button className="border border-zinc-500 px-2 py-1 hover:border-white w-max">429-110</button>
           </div>
        </div>
        <p className="text-center">&copy; 2024 View in 4K, Inc. All rights reserved.</p>
      </footer>

      {/* Modals */}
      {selectedMovie && (
        <VideoPlayer 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      {isUploadOpen && (
        <UploadModal 
          onClose={() => setIsUploadOpen(false)} 
          onUpload={handleUpload}
        />
      )}
    </div>
  );
};

export default App;
