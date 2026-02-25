import axios, { AxiosError } from 'axios';
import type {
  CurrentWeather,
  ForecastResponse,
  HistoricalResponse,
  MarineResponse,
  LocationResult,
  Unit,
} from '../types/weather';

const API_KEY = '2b827b8ce7f7044e0323d6d01dcaa599';
const BASE_URL = 'http://api.weatherstack.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class WeatherAPIError extends Error {
  code?: number;
  type?: string;
  
  constructor(message: string, code?: number, type?: string) {
    super(message);
    this.name = 'WeatherAPIError';
    this.code = code;
    this.type = type;
  }
}

const handleError = (error: AxiosError): never => {
  if (error.response?.data) {
    const data = error.response.data as { error?: { info?: string; code?: number; type?: string } };
    if (data.error) {
      throw new WeatherAPIError(
        data.error.info || 'Unknown API error',
        data.error.code,
        data.error.type
      );
    }
  }
  if (error.code === 'ECONNABORTED') {
    throw new WeatherAPIError('Request timed out. Please try again.');
  }
  if (error.code === 'ERR_NETWORK') {
    throw new WeatherAPIError('Network error. Please check your connection.');
  }
  throw new WeatherAPIError(error.message || 'An unexpected error occurred');
};

const checkResponseError = (data: unknown): void => {
  const responseData = data as { error?: { info?: string; code?: number; type?: string } };
  if (responseData.error) {
    throw new WeatherAPIError(
      responseData.error.info || 'API Error',
      responseData.error.code,
      responseData.error.type
    );
  }
};

export const weatherApi = {
  async getCurrentWeather(query: string, unit: Unit = 'm'): Promise<CurrentWeather> {
    try {
      const response = await apiClient.get('/current', {
        params: {
          access_key: API_KEY,
          query,
          unit,
        },
      });
      checkResponseError(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof WeatherAPIError) throw error;
      return handleError(error as AxiosError);
    }
  },

  async getForecast(
    query: string,
    days: number = 7,
    unit: Unit = 'm'
  ): Promise<ForecastResponse> {
    try {
      const response = await apiClient.get('/forecast', {
        params: {
          access_key: API_KEY,
          query,
          forecast_days: days,
          unit,
        },
      });
      checkResponseError(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof WeatherAPIError) throw error;
      return handleError(error as AxiosError);
    }
  },

  async getHistorical(
    query: string,
    date: string,
    unit: Unit = 'm'
  ): Promise<HistoricalResponse> {
    try {
      const response = await apiClient.get('/historical', {
        params: {
          access_key: API_KEY,
          query,
          historical_date: date,
          unit,
        },
      });
      checkResponseError(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof WeatherAPIError) throw error;
      return handleError(error as AxiosError);
    }
  },

  async getMarine(query: string, unit: Unit = 'm'): Promise<MarineResponse> {
    try {
      const response = await apiClient.get('/marine', {
        params: {
          access_key: API_KEY,
          query,
          unit,
        },
      });
      checkResponseError(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof WeatherAPIError) throw error;
      return handleError(error as AxiosError);
    }
  },

  async searchLocations(query: string): Promise<LocationResult[]> {
    try {
      const response = await apiClient.get('/locations', {
        params: {
          access_key: API_KEY,
          query,
        },
      });
      checkResponseError(response.data);
      return response.data.results || [];
    } catch (error) {
      if (error instanceof WeatherAPIError) throw error;
      return handleError(error as AxiosError);
    }
  },
};
