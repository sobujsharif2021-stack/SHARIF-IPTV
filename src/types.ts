export interface MediaItem {
  id: string;
  title: string;
  category: 'all' | 'sports' | 'cartoon' | 'news' | 'movie';
  thumbnail: string;
  streamUrl: string;
  isLive: boolean;
}
