import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Thermometer, Droplets, Wind, Sun } from 'lucide-react';
import { useForecast } from '../../hooks/useWeather';
import { useWeatherStore } from '../../store/weatherStore';
import { GlassCard } from '../ui/GlassCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { getUnitSymbol, getSpeedUnit, getWeatherIcon } from '../../utils/weatherIcons';
import { format, parseISO } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const ForecastView = () => {
  const { currentLocation, unit } = useWeatherStore();
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [forecastDays, setForecastDays] = useState(7);
  
  const { data, isLoading, error, refetch } = useForecast(currentLocation, forecastDays, unit);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading forecast data..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error instanceof Error ? error.message : 'Failed to load forecast data'} 
        onRetry={() => refetch()}
      />
    );
  }

  if (!data?.forecast) return null;

  const forecastEntries = Object.entries(data.forecast);
  const tempUnit = getUnitSymbol(unit);
  const speedUnit = getSpeedUnit(unit);

  // Prepare chart data
  const chartData = forecastEntries.map(([date, day]) => ({
    date: format(parseISO(date), 'MMM d'),
    maxTemp: day.maxtemp,
    minTemp: day.mintemp,
    avgTemp: day.avgtemp,
  }));

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-offwhite flex items-center gap-2">
          <Calendar className="w-6 h-6 text-coral-400" />
          {forecastDays}-Day Forecast
        </h2>
        <div className="flex items-center gap-2">
          {[7, 10, 14].map((days) => (
            <button
              key={days}
              onClick={() => setForecastDays(days)}
              className={`glass-button ${forecastDays === days ? 'bg-white/20' : ''}`}
            >
              {days} Days
            </button>
          ))}
        </div>
      </div>

      {/* Temperature Chart */}
      <GlassCard padding="lg">
        <h3 className="text-lg font-semibold text-offwhite mb-4">Temperature Trend</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke="#94a3b8" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12}
                tickLine={false}
                unit={tempUnit}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f8fafc' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Area
                type="monotone"
                dataKey="maxTemp"
                stroke="#f97316"
                fillOpacity={1}
                fill="url(#colorMax)"
                name="High"
              />
              <Area
                type="monotone"
                dataKey="minTemp"
                stroke="#14b8a6"
                fillOpacity={1}
                fill="url(#colorMin)"
                name="Low"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {forecastEntries.map(([date, day]) => (
          <ForecastDayCard
            key={date}
            date={date}
            day={day}
            tempUnit={tempUnit}
            speedUnit={speedUnit}
            isExpanded={expandedDay === date}
            onToggle={() => setExpandedDay(expandedDay === date ? null : date)}
          />
        ))}
      </div>
    </div>
  );
};

interface ForecastDayCardProps {
  date: string;
  day: {
    date: string;
    maxtemp: number;
    mintemp: number;
    avgtemp: number;
    uv_index: number;
    hourly: Array<{
      chanceofrain: number;
      wind_speed: number;
    }>;
  };
  tempUnit: string;
  speedUnit: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const ForecastDayCard = ({ date, day, tempUnit, speedUnit, isExpanded, onToggle }: ForecastDayCardProps) => {
  const avgRainChance = Math.round(
    day.hourly.reduce((sum, h) => sum + h.chanceofrain, 0) / day.hourly.length
  );
  const avgWindSpeed = Math.round(
    day.hourly.reduce((sum, h) => sum + h.wind_speed, 0) / day.hourly.length
  );

  return (
    <GlassCard 
      className="cursor-pointer transition-all duration-300"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-offwhite">
            {format(parseISO(date), 'EEEE')}
          </p>
          <p className="text-sm text-slate-muted">
            {format(parseISO(date), 'MMM d')}
          </p>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-slate-muted" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-muted" />
        )}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Sun className="w-10 h-10 text-coral-400" />
        <div>
          <p className="text-2xl font-bold text-offwhite">
            {day.maxtemp}{tempUnit}
          </p>
          <p className="text-slate-muted">
            {day.mintemp}{tempUnit}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1 text-slate-muted">
          <Droplets className="w-4 h-4 text-blue-400" />
          <span>{avgRainChance}%</span>
        </div>
        <div className="flex items-center gap-1 text-slate-muted">
          <Wind className="w-4 h-4 text-teal-400" />
          <span>{avgWindSpeed} {speedUnit}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-muted">Average</span>
            <span className="text-offwhite">{day.avgtemp}{tempUnit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-muted">UV Index</span>
            <span className="text-offwhite">{day.uv_index}</span>
          </div>
        </div>
      )}
    </GlassCard>
  );
};
