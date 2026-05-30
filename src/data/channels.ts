import { MediaItem } from '../types';
import sports from './sports.json';
import movies from './movies.json';
import cartoons from './cartoons.json';
import news from './news.json';
import playlists from './playlists.json';

export const channels: MediaItem[] = [
  ...sports.map(i => ({...i, id: `s-${i.id}`})),
  ...movies.map(i => ({...i, id: `m-${i.id}`})),
  ...cartoons.map(i => ({...i, id: `c-${i.id}`})),
  ...news.map(i => ({...i, id: `n-${i.id}`})),
  ...playlists.map(i => ({...i, id: `p-${i.id}`})),
] as MediaItem[];
