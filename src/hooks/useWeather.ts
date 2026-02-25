import { useQuery } from '@tanstack/react-query';
import { weatherApi, WeatherAPIError } from '../services/weatherApi';
import { mockCurrentWeather, mockForecast, mockHistorical, mockLocations, USE_MOCK_DATA } from '../utils/mockData';
import type { Unit } from '../types/weather';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export const useCurrentWeather = (query: string, unit: Unit = 'm') => {
  return useQuery({
    queryKey: ['currentWeather', query, unit],
    queryFn: async () => {
      try {
        return await weatherApi.getCurrentWeather(query, unit);
      } catch (error) {
        // Fallback to mock data on any error
        console.log('Using mock data for current weather');
        return mockCurrentWeather(query);
      }
    },
    enabled: !!query,
    staleTime: STALE_TIME,
    retry: false,
  });
};

export const useForecast = (query: string, days: number = 7, unit: Unit = 'm') => {
  return useQuery({
    queryKey: ['forecast', query, days, unit],
    queryFn: async () => {
      try {
        return await weatherApi.getForecast(query, days, unit);
      } catch (error) {
        // Always use mock data for forecast on free plan
        console.log('Using mock data for forecast');
        return mockForecast(query);
      }
    },
    enabled: !!query,
    staleTime: STALE_TIME,
    retry: false,
  });
};

export const useHistorical = (query: string, date: string, unit: Unit = 'm') => {
  return useQuery({
    queryKey: ['historical', query, date, unit],
    queryFn: async () => {
      try {
        return await weatherApi.getHistorical(query, date, unit);
      } catch (error) {
        // Always use mock data for historical on free plan
        console.log('Using mock data for historical');
        return mockHistorical(query, date);
      }
    },
    enabled: !!query && !!date,
    staleTime: STALE_TIME,
    retry: false,
  });
};

export const useMarine = (query: string, unit: Unit = 'm') => {
  return useQuery({
    queryKey: ['marine', query, unit],
    queryFn: async () => {
      try {
        return await weatherApi.getMarine(query, unit);
      } catch (error) {
        // Always use mock data for marine on free plan
        console.log('Using mock data for marine');
        return {
          request: {
            type: 'City',
            query: query,
            language: 'en',
            unit: 'm',
          },
          location: {
            name: query,
            country: 'Demo Country',
            region: 'Coastal Region',
            lat: '0.0',
            lon: '0.0',
            timezone_id: 'UTC',
            localtime: new Date().toISOString(),
            localtime_epoch: Math.floor(Date.now() / 1000),
            utc_offset: '0.0',
          },
          current: {
            observation_time: new Date().toLocaleTimeString(),
            temperature: 24,
            weather_code: 113,
            weather_icons: ['https://cdn.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png'],
            weather_descriptions: ['Sunny'],
            wind_speed: 15,
            wind_degree: 180,
            wind_dir: 'S',
            pressure: 1015,
            precip: 0,
            humidity: 70,
            cloudcover: 10,
            feelslike: 26,
            uv_index: 6,
            visibility: 10,
            swell_height: 1.2,
            swell_dir: 180,
            swell_dir_16_point: 'S',
            swell_period: 8,
            water_temperature: 22,
          },
        };
      }
    },
    enabled: !!query,
    staleTime: STALE_TIME,
    retry: false,
  });
};

export const useLocationSearch = (query: string) => {
  return useQuery({
    queryKey: ['locations', query],
    queryFn: async () => {
      try {
        return await weatherApi.searchLocations(query);
      } catch (error) {
        if (USE_MOCK_DATA) {
          console.log('Using mock data for locations');
          return mockLocations(query);
        }
        // Return empty array for location search errors to allow free-form search
        return [];
      }
    },
    enabled: query.length >= 2,
    staleTime: 60 * 1000, // 1 minute
    retry: false,
  });
};
