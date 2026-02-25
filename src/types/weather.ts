export interface CurrentWeather {
  request: RequestInfo;
  location: LocationInfo;
  current: CurrentInfo;
}

export interface RequestInfo {
  type: string;
  query: string;
  language: string;
  unit: string;
}

export interface LocationInfo {
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  timezone_id: string;
  localtime: string;
  localtime_epoch: number;
  utc_offset: string;
}

export interface CurrentInfo {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
  is_day: string;
}

export interface ForecastResponse {
  request: RequestInfo;
  location: LocationInfo;
  current: CurrentInfo;
  forecast: Record<string, ForecastDay>;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  astro: AstroInfo;
  mintemp: number;
  maxtemp: number;
  avgtemp: number;
  totalsnow: number;
  sunhour: number;
  uv_index: number;
  hourly: HourlyForecast[];
}

export interface AstroInfo {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
}

export interface HourlyForecast {
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
}

export interface HistoricalResponse {
  request: RequestInfo;
  location: LocationInfo;
  historical: Record<string, HistoricalDay>;
}

export interface HistoricalDay {
  date: string;
  date_epoch: number;
  astro: AstroInfo;
  mintemp: number;
  maxtemp: number;
  avgtemp: number;
  totalsnow: number;
  sunhour: number;
  uv_index: number;
  hourly: HourlyForecast[];
}

export interface MarineResponse {
  request: RequestInfo;
  location: LocationInfo;
  current: MarineCurrent;
}

export interface MarineCurrent {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
  swell_height: number;
  swell_dir: number;
  swell_dir_16_point: string;
  swell_period: number;
  water_temperature: number;
}

export interface LocationResult {
  id: number;
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  url: string;
}

export type Unit = 'm' | 's' | 'f';

export interface SearchFilters {
  query: string;
  unit: Unit;
  language: string;
}

export type ViewType = 'current' | 'forecast' | 'historical' | 'marine';
