import type { CurrentWeather, ForecastResponse, HistoricalResponse, LocationResult } from '../types/weather';

export const mockCurrentWeather = (location: string): CurrentWeather => ({
  request: {
    type: 'City',
    query: location,
    language: 'en',
    unit: 'm',
  },
  location: {
    name: location,
    country: 'Demo Country',
    region: 'Demo Region',
    lat: '0.0',
    lon: '0.0',
    timezone_id: 'UTC',
    localtime: new Date().toISOString(),
    localtime_epoch: Math.floor(Date.now() / 1000),
    utc_offset: '0.0',
  },
  current: {
    observation_time: new Date().toLocaleTimeString(),
    temperature: 22,
    weather_code: 113,
    weather_icons: ['https://cdn.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png'],
    weather_descriptions: ['Sunny'],
    wind_speed: 10,
    wind_degree: 180,
    wind_dir: 'S',
    pressure: 1015,
    precip: 0,
    humidity: 60,
    cloudcover: 10,
    feelslike: 24,
    uv_index: 5,
    visibility: 10,
    is_day: 'yes',
  },
});

export const mockForecast = (location: string): ForecastResponse => {
  const forecast: Record<string, {
    date: string;
    date_epoch: number;
    astro: {
      sunrise: string;
      sunset: string;
      moonrise: string;
      moonset: string;
      moon_phase: string;
      moon_illumination: number;
    };
    mintemp: number;
    maxtemp: number;
    avgtemp: number;
    totalsnow: number;
    sunhour: number;
    uv_index: number;
    hourly: Array<{
      time: string;
      temperature: number;
      wind_speed: number;
      wind_degree: number;
      wind_dir: string;
      weather_code: number;
      weather_icons: string[];
      weather_descriptions: string[];
      precip: number;
      humidity: number;
      visibility: number;
      pressure: number;
      cloudcover: number;
      heatindex: number;
      dewpoint: number;
      windchill: number;
      windgust: number;
      feelslike: number;
      chanceofrain: number;
      chanceofremdry: number;
      chanceofwindy: number;
      chanceofovercast: number;
      chanceofsunshine: number;
      chanceoffrost: number;
      chanceofhightemp: number;
      chanceoffog: number;
      chanceofsnow: number;
      chanceofthunder: number;
      uv_index: number;
    }>;
  }> = {};

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    forecast[dateStr] = {
      date: dateStr,
      date_epoch: Math.floor(date.getTime() / 1000),
      astro: {
        sunrise: '06:00 AM',
        sunset: '07:00 PM',
        moonrise: '08:00 PM',
        moonset: '05:00 AM',
        moon_phase: 'Full Moon',
        moon_illumination: 100,
      },
      mintemp: 15 + Math.floor(Math.random() * 5),
      maxtemp: 25 + Math.floor(Math.random() * 5),
      avgtemp: 20,
      totalsnow: 0,
      sunhour: 10,
      uv_index: 5,
      hourly: Array.from({ length: 24 }, (_, h) => ({
        time: `${h.toString().padStart(2, '0')}:00`,
        temperature: 18 + Math.floor(Math.random() * 8),
        wind_speed: 5 + Math.floor(Math.random() * 10),
        wind_degree: 180,
        wind_dir: 'S',
        weather_code: 113,
        weather_icons: ['https://cdn.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png'],
        weather_descriptions: ['Sunny'],
        precip: 0,
        humidity: 60,
        visibility: 10,
        pressure: 1015,
        cloudcover: 10,
        heatindex: 22,
        dewpoint: 15,
        windchill: 18,
        windgust: 15,
        feelslike: 20,
        chanceofrain: 10,
        chanceofremdry: 90,
        chanceofwindy: 20,
        chanceofovercast: 10,
        chanceofsunshine: 80,
        chanceoffrost: 0,
        chanceofhightemp: 30,
        chanceoffog: 5,
        chanceofsnow: 0,
        chanceofthunder: 5,
        uv_index: 5,
      })),
    };
  }

  return {
    request: {
      type: 'City',
      query: location,
      language: 'en',
      unit: 'm',
    },
    location: {
      name: location,
      country: 'Demo Country',
      region: 'Demo Region',
      lat: '0.0',
      lon: '0.0',
      timezone_id: 'UTC',
      localtime: new Date().toISOString(),
      localtime_epoch: Math.floor(Date.now() / 1000),
      utc_offset: '0.0',
    },
    current: {
      observation_time: new Date().toLocaleTimeString(),
      temperature: 22,
      weather_code: 113,
      weather_icons: ['https://cdn.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png'],
      weather_descriptions: ['Sunny'],
      wind_speed: 10,
      wind_degree: 180,
      wind_dir: 'S',
      pressure: 1015,
      precip: 0,
      humidity: 60,
      cloudcover: 10,
      feelslike: 24,
      uv_index: 5,
      visibility: 10,
      is_day: 'yes',
    },
    forecast,
  };
};

export const mockLocations = (query: string): LocationResult[] => [
  {
    id: 1,
    name: query,
    country: 'Demo Country',
    region: 'Demo Region',
    lat: '0.0',
    lon: '0.0',
    url: `weatherstack.com/${query.toLowerCase()}`,
  },
  {
    id: 2,
    name: `${query} City`,
    country: 'Demo Country',
    region: 'North',
    lat: '10.0',
    lon: '10.0',
    url: `weatherstack.com/${query.toLowerCase()}-city`,
  },
  {
    id: 3,
    name: `${query} Town`,
    country: 'Another Country',
    region: 'South',
    lat: '-10.0',
    lon: '-10.0',
    url: `weatherstack.com/${query.toLowerCase()}-town`,
  },
];

// Flag to enable demo mode when API fails
export const USE_MOCK_DATA = false;

export const mockHistorical = (location: string, date: string): HistoricalResponse => {
  const historical: Record<string, {
    date: string;
    date_epoch: number;
    astro: {
      sunrise: string;
      sunset: string;
      moonrise: string;
      moonset: string;
      moon_phase: string;
      moon_illumination: number;
    };
    mintemp: number;
    maxtemp: number;
    avgtemp: number;
    totalsnow: number;
    sunhour: number;
    uv_index: number;
    hourly: Array<{
      time: string;
      temperature: number;
      wind_speed: number;
      wind_degree: number;
      wind_dir: string;
      weather_code: number;
      weather_icons: string[];
      weather_descriptions: string[];
      precip: number;
      humidity: number;
      visibility: number;
      pressure: number;
      cloudcover: number;
      heatindex: number;
      dewpoint: number;
      windchill: number;
      windgust: number;
      feelslike: number;
      chanceofrain: number;
      chanceofremdry: number;
      chanceofwindy: number;
      chanceofovercast: number;
      chanceofsunshine: number;
      chanceoffrost: number;
      chanceofhightemp: number;
      chanceoffog: number;
      chanceofsnow: number;
      chanceofthunder: number;
      uv_index: number;
    }>;
  }> = {};

  historical[date] = {
    date: date,
    date_epoch: Math.floor(new Date(date).getTime() / 1000),
    astro: {
      sunrise: '06:15 AM',
      sunset: '06:45 PM',
      moonrise: '07:30 PM',
      moonset: '05:45 AM',
      moon_phase: 'Waxing Gibbous',
      moon_illumination: 75,
    },
    mintemp: 16,
    maxtemp: 28,
    avgtemp: 22,
    totalsnow: 0,
    sunhour: 9,
    uv_index: 6,
    hourly: Array.from({ length: 24 }, (_, h) => ({
      time: `${h.toString().padStart(2, '0')}:00`,
      temperature: 18 + Math.floor(Math.random() * 10),
      wind_speed: 8 + Math.floor(Math.random() * 12),
      wind_degree: 180,
      wind_dir: 'S',
      weather_code: 113,
      weather_icons: ['https://cdn.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png'],
      weather_descriptions: ['Sunny'],
      precip: Math.random() > 0.8 ? 0.5 : 0,
      humidity: 55 + Math.floor(Math.random() * 20),
      visibility: 10,
      pressure: 1013 + Math.floor(Math.random() * 5),
      cloudcover: Math.floor(Math.random() * 20),
      heatindex: 24,
      dewpoint: 16,
      windchill: 18,
      windgust: 20,
      feelslike: 22,
      chanceofrain: Math.random() > 0.8 ? 20 : 0,
      chanceofremdry: 80,
      chanceofwindy: 30,
      chanceofovercast: 15,
      chanceofsunshine: 85,
      chanceoffrost: 0,
      chanceofhightemp: 40,
      chanceoffog: 5,
      chanceofsnow: 0,
      chanceofthunder: 10,
      uv_index: Math.floor(Math.random() * 3) + 4,
    })),
  };

  return {
    request: {
      type: 'City',
      query: location,
      language: 'en',
      unit: 'm',
    },
    location: {
      name: location,
      country: 'Demo Country',
      region: 'Demo Region',
      lat: '0.0',
      lon: '0.0',
      timezone_id: 'UTC',
      localtime: new Date().toISOString(),
      localtime_epoch: Math.floor(Date.now() / 1000),
      utc_offset: '0.0',
    },
    historical,
  };
};
