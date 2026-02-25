import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Unit, ViewType, LocationResult } from '../types/weather';

interface WeatherState {
  currentLocation: string;
  selectedLocation: LocationResult | null;
  unit: Unit;
  language: string;
  view: ViewType;
  recentSearches: string[];
  favoriteLocations: LocationResult[];
  
  setCurrentLocation: (location: string) => void;
  setSelectedLocation: (location: LocationResult | null) => void;
  setUnit: (unit: Unit) => void;
  setLanguage: (language: string) => void;
  setView: (view: ViewType) => void;
  addRecentSearch: (query: string) => void;
  addFavoriteLocation: (location: LocationResult) => void;
  removeFavoriteLocation: (locationId: number) => void;
  clearRecentSearches: () => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      currentLocation: 'New York',
      selectedLocation: null,
      unit: 'm',
      language: 'en',
      view: 'current',
      recentSearches: [],
      favoriteLocations: [],

      setCurrentLocation: (location) => set({ currentLocation: location }),
      setSelectedLocation: (location) => set({ selectedLocation: location }),
      setUnit: (unit) => set({ unit }),
      setLanguage: (language) => set({ language }),
      setView: (view) => set({ view }),
      
      addRecentSearch: (query) =>
        set((state) => ({
          recentSearches: [query, ...state.recentSearches.filter((s) => s !== query)].slice(0, 10),
        })),
      
      addFavoriteLocation: (location) =>
        set((state) => ({
          favoriteLocations: [...state.favoriteLocations.filter((l) => l.id !== location.id), location],
        })),
      
      removeFavoriteLocation: (locationId) =>
        set((state) => ({
          favoriteLocations: state.favoriteLocations.filter((l) => l.id !== locationId),
        })),
      
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'weather-storage',
    }
  )
);
