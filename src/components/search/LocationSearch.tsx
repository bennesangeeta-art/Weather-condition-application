import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { useLocationSearch } from '../../hooks/useWeather';
import { useWeatherStore } from '../../store/weatherStore';
import { GlassCard } from '../ui/GlassCard';
import { cn } from '../../utils/cn';

export const LocationSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { currentLocation, setCurrentLocation, addRecentSearch, addFavoriteLocation } = useWeatherStore();
  const { data: locations, isLoading } = useLocationSearch(searchQuery);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocation = (locationName: string) => {
    const trimmedLocation = locationName.trim();
    if (trimmedLocation) {
      setCurrentLocation(trimmedLocation);
      addRecentSearch(trimmedLocation);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSelectLocation(searchQuery.trim());
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-muted" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search for a city, region, or coordinates..."
            className="glass-input w-full pl-12 pr-12 py-4 text-base"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-slate-muted" />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown Results */}
      {isOpen && (searchQuery.length >= 2 || (locations && locations.length > 0)) && (
        <GlassCard className="absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto z-50" padding="sm">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-coral-400" />
            </div>
          ) : locations && locations.length > 0 ? (
            <div className="py-2">
              <div className="px-3 py-2 text-xs font-medium text-slate-muted uppercase tracking-wider">
                Locations
              </div>
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <button
                    onClick={() => handleSelectLocation(location.name)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249, 115, 22, 0.2)' }}>
                      <MapPin className="w-4 h-4" style={{ color: '#fb923c' }} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-offwhite truncate">
                        {location.name}
                      </div>
                      <div className="text-sm text-slate-muted truncate">
                        {location.region && `${location.region}, `}{location.country}
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addFavoriteLocation(location);
                    }}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    title="Add to favorites"
                  >
                    <span style={{ color: '#fb923c' }}>★</span>
                  </button>
                </div>
              ))}
            </div>
          ) : searchQuery.length >= 2 ? (
            <div className="py-8 text-center">
              <MapPin className="w-8 h-8 text-slate-muted mx-auto mb-2" />
              <p className="text-slate-muted">No locations found</p>
            </div>
          ) : null}
        </GlassCard>
      )}

      {/* Current Location Badge */}
      <div className="flex items-center justify-center mt-3 gap-2">
        <span className="text-sm" style={{ color: 'var(--color-slate-muted)' }}>Current Location:</span>
        <span className="text-sm font-medium flex items-center gap-1" style={{ color: '#fb923c' }}>
          <MapPin className="w-3 h-3" />
          {currentLocation}
        </span>
      </div>
    </div>
  );
};
