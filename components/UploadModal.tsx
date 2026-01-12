
import React, { useState } from 'react';
import { UploadFormData } from '../types';
import { generateMovieEnhancement } from '../services/geminiService';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (data: UploadFormData) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [formData, setFormData] = useState<UploadFormData>({
    title: '',
    description: '',
    category: 'Action',
    thumbnail: null,
    video: null
  });
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [previewThumb, setPreviewThumb] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData(prev => ({ ...prev, [type]: result }));
        if (type === 'thumbnail') setPreviewThumb(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const enhanceWithAI = async () => {
    if (!formData.title) return alert("Enter a title first");
    setIsEnhancing(true);
    const result = await generateMovieEnhancement(formData.title, formData.description);
    if (result) {
      setFormData(prev => ({
        ...prev,
        description: `${result.synopsis || prev.description}\n\nTagline: ${result.tagline || ''}`
      }));
    }
    setIsEnhancing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.thumbnail) {
      alert("Title and thumbnail are required!");
      return;
    }
    onUpload(formData);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center space-x-2">
            <i className="fa-solid fa-cloud-arrow-up text-red-600"></i>
            <span>Upload to View in 4K</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Movie Title</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. My Awesome Vlog"
                  className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-sm focus:border-red-600 outline-none"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
                <button 
                  type="button"
                  onClick={enhanceWithAI}
                  disabled={isEnhancing}
                  className="bg-zinc-800 hover:bg-zinc-700 text-xs px-4 rounded-lg flex items-center space-x-2 whitespace-nowrap disabled:opacity-50"
                >
                  <i className={`fa-solid fa-wand-magic-sparkles ${isEnhancing ? 'animate-pulse text-purple-400' : 'text-blue-400'}`}></i>
                  <span>AI Enhance</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="What is your video about?"
                className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-sm focus:border-red-600 outline-none"
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
                <select
                  className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-sm focus:border-red-600 outline-none"
                  value={formData.category}
                  onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option>Action</option>
                  <option>Sci-Fi</option>
                  <option>Trending</option>
                  <option>Popular</option>
                </select>
              </div>
              <div>
                 <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Upload Video</label>
                 <input
                  type="file"
                  accept="video/*"
                  className="w-full bg-black/50 border border-zinc-700 rounded-lg p-2 text-xs"
                  onChange={e => handleFileChange(e, 'video')}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Thumbnail</label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-xl p-4 hover:border-red-600/50 transition bg-black/20">
                {previewThumb ? (
                  <div className="relative group">
                    <img src={previewThumb} className="h-32 rounded-lg" alt="Preview" />
                    <button 
                      type="button" 
                      onClick={() => { setPreviewThumb(null); setFormData(p => ({...p, thumbnail: null})) }}
                      className="absolute -top-2 -right-2 bg-red-600 w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer text-center">
                    <i className="fa-solid fa-image text-3xl text-zinc-500 mb-2"></i>
                    <p className="text-xs text-gray-400">Click to upload thumbnail</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => handleFileChange(e, 'thumbnail')}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 flex space-x-3">
             <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-lg font-bold text-sm transition"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold text-sm transition shadow-lg shadow-red-600/20"
            >
              Publish Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
