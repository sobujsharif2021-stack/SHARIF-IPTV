import { LayoutGrid, Tv, Film, Newspaper, Heart, List, Search } from 'lucide-react';
import { MediaItem } from '../types.ts';

export default function Sidebar({ onSelect }: { onSelect: (category: MediaItem['category'] | 'favorites' | 'playlist') => void }) {
  return (
    <div className="w-20 lg:w-64 bg-slate-950 border-r border-slate-800 flex flex-col p-4 gap-6">
      <div className="font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 text-xl lg:text-2xl">SHARIF IPTV</div>
      <nav className="flex flex-col gap-2">
        <NavItem icon={LayoutGrid} label="Dashboard" onClick={() => onSelect('all')} />
        <NavItem icon={Tv} label="Sports" onClick={() => onSelect('sports')} />
        <NavItem icon={Film} label="Cartoons" onClick={() => onSelect('cartoon')} />
        <NavItem icon={Newspaper} label="News" onClick={() => onSelect('news')} />
        <NavItem icon={Film} label="Movies" onClick={() => onSelect('movie')} />
        <NavItem icon={Heart} label="Favorites" onClick={() => onSelect('favorites')} />
        <NavItem icon={List} label="Playlist" onClick={() => onSelect('playlist')} />
      </nav>
    </div>
  );
}

function NavItem({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-4 p-3 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition w-full">
      <Icon size={24} />
      <span className="hidden lg:block">{label}</span>
    </button>
  );
}
