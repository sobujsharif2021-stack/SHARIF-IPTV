import { MediaItem } from '../types.ts';
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer({ item }: { item: MediaItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !item.streamUrl) return;

    // Cleanup previous hls instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    
    // Reset video player state to ensure clean load
    video.pause();
    video.src = "";
    video.load();
    
    if (item.streamUrl.endsWith('.m3u8') || item.streamUrl.endsWith('.m3u')) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(item.streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS Error:", event, data);
        });
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(e => {
            if (e.name !== 'AbortError') console.error("Playback failed:", e);
          });
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl') || video.canPlayType('application/x-mpegURL')) {
        video.src = item.streamUrl;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(e => {
            if (e.name !== 'AbortError') console.error("Playback failed:", e);
          });
        });
      }
    } else {
      video.src = item.streamUrl;
      video.play().catch(e => {
        if (e.name !== 'AbortError') console.error("Playback failed:", e);
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [item.streamUrl]);

  return (
    <div className="w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
      {item.streamUrl ? (
        <video 
          ref={videoRef} 
          controls 
          className="w-full aspect-video" 
          crossOrigin="anonymous"
          playsInline
        />
      ) : (
        <div className="w-full aspect-video flex items-center justify-center text-slate-500">
          Invalid or missing stream URL
        </div>
      )}
        <div className="p-4 bg-slate-900">
          <h2 className="text-white text-xl font-bold">{item.title}</h2>
        </div>
    </div>
  );
}
