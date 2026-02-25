import { 
  Droplets, 
  Wind, 
  Gauge, 
  Eye, 
  Sun, 
  CloudRain,
  Thermometer,
  Navigation,
  Sunrise,
  Sunset
} from 'lucide-react';
import { useCurrentWeather } from '../../hooks/useWeather';
import { useWeatherStore } from '../../store/weatherStore';
import { GlassCard } from '../ui/GlassCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { getUnitSymbol, getSpeedUnit } from '../../utils/weatherIcons';
import { format } from 'date-fns';

export const CurrentWeatherView = () => {
  const { currentLocation, unit } = useWeatherStore();
  const { data, isLoading, error, refetch } = useCurrentWeather(currentLocation, unit);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading weather data..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error instanceof Error ? error.message : 'Failed to load weather data'} 
        onRetry={() => refetch()}
      />
    );
  }

  if (!data) return null;

  const { current, location } = data;
  const tempUnit = getUnitSymbol(unit);
  const speedUnit = getSpeedUnit(unit);

  return (
    <div className="space-y-6">
      {/* Main Weather Card */}
      <GlassCard className="relative overflow-hidden" padding="lg">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.2), transparent 70%)' }} />
        
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-offwhite mb-1">
                {location.name}, {location.country}
              </h2>
              <p className="text-slate-muted">
                {format(new Date(location.localtime), 'EEEE, MMMM d, yyyy • h:mm a')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-muted">Last Updated</p>
              <p className="text-sm text-offwhite">{current.observation_time}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-4">
              {current.weather_icons[0] ? (
                <img 
                  src={current.weather_icons[0]} 
                  alt={current.weather_descriptions[0]}
                  className="w-24 h-24 object-contain"
                />
              ) : (
                <Sun className="w-24 h-24 text-coral-400" />
              )}
              <div>
                <div className="text-7xl font-bold text-offwhite">
                  {current.temperature}{tempUnit}
                </div>
                <div className="text-xl text-slate-muted capitalize">
                  {current.weather_descriptions[0]}
                </div>
              </div>
            </div>

            <div className="flex-1 w-full md:w-auto">
              <div className="glass-panel p-4 inline-flex items-center gap-3">
                <Thermometer className="w-5 h-5 text-coral-400" />
                <span className="text-slate-muted">Feels like</span>
                <span className="text-xl font-semibold text-offwhite">
                  {current.feelslike}{tempUnit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={Droplets}
          label="Humidity"
          value={`${current.humidity}%`}
          color="text-blue-400"
        />
        <MetricCard
          icon={Wind}
          label="Wind Speed"
          value={`${current.wind_speed} ${speedUnit}`}
          color="text-teal-400"
        />
        <MetricCard
          icon={Navigation}
          label="Wind Direction"
          value={current.wind_dir}
          color="text-amber-400"
          rotation={current.wind_degree}
        />
        <MetricCard
          icon={Gauge}
          label="Pressure"
          value={`${current.pressure} mb`}
          color="text-purple-400"
        />
        <MetricCard
          icon={Eye}
          label="Visibility"
          value={`${current.visibility} km`}
          color="text-emerald-400"
        />
        <MetricCard
          icon={CloudRain}
          label="Precipitation"
          value={`${current.precip} mm`}
          color="text-cyan-400"
        />
        <MetricCard
          icon={Sun}
          label="UV Index"
          value={current.uv_index.toString()}
          color="text-orange-400"
        />
        <MetricCard
          icon={CloudRain}
          label="Cloud Cover"
          value={`${current.cloudcover}%`}
          color="text-indigo-400"
        />
      </div>

      {/* Astro Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>
            <Sunrise className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-slate-muted">Sunrise</p>
            <p className="text-lg font-semibold text-offwhite">6:12 AM</p>
          </div>
        </GlassCard>
        <GlassCard className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(99, 102, 241, 0.2)' }}>
            <Sunset className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <p className="text-sm text-slate-muted">Sunset</p>
            <p className="text-lg font-semibold text-offwhite">7:45 PM</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

interface MetricCardProps {
  icon: typeof Droplets;
  label: string;
  value: string;
  color: string;
  rotation?: number;
}

const MetricCard = ({ icon: Icon, label, value, color, rotation }: MetricCardProps) => (
  <GlassCard className="flex items-center gap-4" padding="md">
    <div className={rotation !== undefined ? `transform rotate-[${rotation}deg]` : ''}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <div>
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
    </div>
  </GlassCard>
);
