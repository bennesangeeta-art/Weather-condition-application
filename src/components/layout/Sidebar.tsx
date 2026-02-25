import { 
  Cloud, 
  CalendarDays, 
  History, 
  Waves, 
  Star,
  Clock,
  MapPin
} from 'lucide-react';
import { useWeatherStore } from '../../store/weatherStore';
import type { ViewType } from '../../types/weather';
import { cn } from '../../utils/cn';

const navItems: { id: ViewType; label: string; icon: typeof Cloud }[] = [
  { id: 'current', label: 'Current Weather', icon: Cloud },
  { id: 'forecast', label: 'Forecast', icon: CalendarDays },
  { id: 'historical', label: 'Historical', icon: History },
  { id: 'marine', label: 'Marine', icon: Waves },
];

export const Sidebar = () => {
  const { view, setView, recentSearches, favoriteLocations, setCurrentLocation } = useWeatherStore();

  return (
    <aside className="w-64 hidden lg:block">
      <div className="sticky top-24 space-y-4">
        {/* Navigation */}
        <nav className="glass-card p-2">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={cn(
                    'nav-item w-full',
                    view === item.id && 'active'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-slate-muted" />
              <span className="text-sm font-medium text-slate-muted">Recent</span>
            </div>
            <div className="space-y-1">
              {recentSearches.slice(0, 5).map((search) => (
                <button
                  key={search}
                  onClick={() => setCurrentLocation(search)}
                  className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm text-slate-muted hover:text-offwhite hover:bg-white/5 transition-colors text-left"
                >
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{search}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Favorites */}
        {favoriteLocations.length > 0 && (
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4" style={{ color: '#fb923c' }} />
              <span className="text-sm font-medium text-slate-muted">Favorites</span>
            </div>
            <div className="space-y-1">
              {favoriteLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setCurrentLocation(location.name)}
                  className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm text-slate-muted hover:text-offwhite hover:bg-white/5 transition-colors text-left"
                >
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{location.name}, {location.country}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
