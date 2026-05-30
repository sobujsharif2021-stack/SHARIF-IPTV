/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import MediaCard from '../components/MediaCard.tsx';
import VideoPlayer from '../components/VideoPlayer.tsx';
import { allMedia } from '../data/index.ts';
import { MediaItem } from '../types.ts';

export default function App() {
  const [mediaList] = useState<MediaItem[]>(allMedia);
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch (e) {
      return [];
    }
  });

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newFavorites = favorites.includes(id) 
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const filteredMedia = useMemo(() => {
    let filtered = mediaList.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (showFavorites) {
      filtered = filtered.filter(item => favorites.includes(item.id));
    }
    return filtered;
  }, [searchTerm, mediaList, showFavorites, favorites]);

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6 text-white tracking-wider glow-text">SHARIF IPTV</h1>

      {/* Video Display Area */}
      <div className="mb-6">
        {selectedVideo ? (
          <VideoPlayer item={selectedVideo} />
        ) : (
          <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center text-gray-500 border border-gray-800">
            Select a channel to start watching
          </div>
        )}
      </div>

      {/* Search & Favorites Bar */}
      <div className="mb-6 flex gap-2">
        <input 
          type="text" 
          placeholder="Search Channel..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow bg-gray-900 border border-gray-800 rounded-lg px-6 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`px-4 py-3 rounded-lg ${showFavorites ? 'bg-red-500' : 'bg-gray-800'}`}
        >
          {showFavorites ? 'All' : 'Favorites'}
        </button>
      </div>

      {/* Channel Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMedia.map(item => (
          <MediaCard 
            key={item.id} 
            item={item} 
            onClick={() => setSelectedVideo(item)}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={(e) => toggleFavorite(e, item.id)}
          />
        ))}
      </div>
    </div>
  );
}

