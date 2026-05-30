import React, { useState } from 'react';
import { MediaItem } from '../types.ts';
import { Heart } from 'lucide-react';

export default function MediaCard({ item, onClick, isFavorite, onToggleFavorite }: { 
  item: MediaItem, 
  onClick: () => void, 
  isFavorite: boolean, 
  onToggleFavorite: (e: React.MouseEvent) => void,
  key?: string
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-white p-2 border-4 border-transparent hover:border-green-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(74,222,128,0.7)]"
      onClick={onClick}
    >
      { !imgError && item.thumbnail ? (
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="w-full h-full object-contain" 
          onError={() => setImgError(true)} 
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-sm text-black font-bold p-2 text-center">
          {item.title}
        </div>
      )}
      <button 
        className={`absolute top-2 right-2 p-1 rounded-full ${isFavorite ? 'bg-red-500' : 'bg-gray-800/80'} text-white`}
        onClick={onToggleFavorite}
      >
        <Heart size={16} fill={isFavorite ? "white" : "none"} />
      </button>
    </div>
  );
}
