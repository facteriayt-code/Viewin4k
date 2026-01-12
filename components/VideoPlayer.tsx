
import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { getAIOpinion } from '../services/geminiService';

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, onClose }) => {
  const [opinion, setOpinion] = useState<string>('Loading AI insight...');

  useEffect(() => {
    getAIOpinion(movie.title).then(setOpinion);
  }, [movie.title]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-0 md:p-12 overflow-y-auto">
      <div className="bg-zinc-900 w-full max-w-6xl rounded-xl relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black transition"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="aspect-video w-full bg-black relative">
          {movie.videoUrl ? (
            <video 
              src={movie.videoUrl} 
              controls 
              autoPlay 
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-800">
              <img src={movie.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-30" />
              <div className="z-10 text-center px-4">
                <i className="fa-solid fa-clapperboard text-6xl text-red-600 mb-4"></i>
                <h3 className="text-3xl font-bold mb-2">Streaming {movie.title}</h3>
                <p className="text-gray-400">Loading digital licenses for 4K streaming...</p>
                <div className="mt-8 flex justify-center space-x-2">
                   {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-red-600 animate-bounce" style={{animationDelay: `${i*0.2}s`}} />)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-4 text-sm font-bold">
               <span className="text-green-500">98% Match</span>
               <span className="text-gray-400">{movie.year}</span>
               <span className="border border-gray-600 px-2 rounded text-xs uppercase">{movie.rating}</span>
               <span className="text-gray-400">4K Ultra HD</span>
            </div>
            
            <h2 className="text-4xl font-black uppercase tracking-tight">{movie.title}</h2>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              {movie.description}
            </p>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-start space-x-4">
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-robot text-sm"></i>
               </div>
               <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">AI Curator Insight</h4>
                  <p className="text-sm italic text-gray-200">"{opinion}"</p>
               </div>
            </div>
          </div>

          <div className="space-y-6 text-sm text-gray-400">
             <div>
               <span className="text-gray-500">Cast:</span> Tom Cruise, Rebecca Ferguson, Simon Pegg
             </div>
             <div>
               <span className="text-gray-500">Genres:</span> Action, Adventure, Spy Thriller
             </div>
             <div>
               <span className="text-gray-500">This movie is:</span> Suspenseful, Exciting
             </div>
             
             <div className="pt-4 flex space-x-4">
                <button className="flex flex-col items-center space-y-1 hover:text-white transition">
                   <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center">
                      <i className="fa-solid fa-plus"></i>
                   </div>
                   <span className="text-[10px] font-bold">My List</span>
                </button>
                <button className="flex flex-col items-center space-y-1 hover:text-white transition">
                   <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center">
                      <i className="fa-regular fa-thumbs-up"></i>
                   </div>
                   <span className="text-[10px] font-bold">Rate</span>
                </button>
                <button className="flex flex-col items-center space-y-1 hover:text-white transition">
                   <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center">
                      <i className="fa-solid fa-share-nodes"></i>
                   </div>
                   <span className="text-[10px] font-bold">Share</span>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
