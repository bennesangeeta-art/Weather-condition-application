import { Waves, Wind, Thermometer, Navigation, Droplets, Anchor } from 'lucide-react';
import { useMarine } from '../../hooks/useWeather';
import { useWeatherStore } from '../../store/weatherStore';
import { GlassCard } from '../ui/GlassCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { getUnitSymbol, getSpeedUnit } from '../../utils/weatherIcons';

export const MarineView = () => {
  const { currentLocation, unit } = useWeatherStore();
  const { data, isLoading, error, refetch } = useMarine(currentLocation, unit);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading marine data..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error instanceof Error ? error.message : 'Failed to load marine data'} 
        onRetry={() => refetch()}
      />
    );
  }

  if (!data?.current) {
    return (
      <GlassCard className="py-16 text-center">
        <Waves className="w-12 h-12 text-slate-muted mx-auto mb-4" />
        <p className="text-slate-muted">No marine data available for this location</p>
        <p className="text-sm text-slate-muted mt-2">
          Try searching for a coastal city or marine location
        </p>
      </GlassCard>
    );
  }

  const { current, location } = data;
  const tempUnit = getUnitSymbol(unit);
  const speedUnit = getSpeedUnit(unit);

  // Type assertion for marine-specific fields
  const marineCurrent = current as {
    swell_height?: number;
    swell_dir?: number;
    swell_dir_16_point?: string;
    swell_period?: number;
    water_temperature?: number;
    temperature: number;
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    humidity: number;
    visibility: number;
    weather_descriptions: string[];
    weather_icons: string[];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-offwhite flex items-center gap-2">
          <Waves className="w-6 h-6 text-coral-400" />
          Marine Weather
        </h2>
        <span className="text-slate-muted">{location.name}, {location.country}</span>
      </div>

      {/* Main Marine Card */}
      <GlassCard className="relative overflow-hidden" padding="lg">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.2), transparent 70%)' }} />
        
        <div className="relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(20, 184, 166, 0.2)' }}>
                <Waves className="w-10 h-10 text-teal-400" />
              </div>
              <div>
                <div className="text-5xl font-bold text-offwhite">
                  {marineCurrent.water_temperature !== undefined 
                    ? `${marineCurrent.water_temperature}${tempUnit}` 
                    : 'N/A'}
                </div>
                <div className="text-lg text-slate-muted">Water Temperature</div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              <MarineMetric
                icon={Anchor}
                label="Swell Height"
                value={marineCurrent.swell_height !== undefined ? `${marineCurrent.swell_height} m` : 'N/A'}
                color="text-blue-400"
              />
              <MarineMetric
                icon={Navigation}
                label="Swell Direction"
                value={marineCurrent.swell_dir_16_point || 'N/A'}
                color="text-amber-400"
              />
              <MarineMetric
                icon={Waves}
                label="Swell Period"
                value={marineCurrent.swell_period !== undefined ? `${marineCurrent.swell_period}s` : 'N/A'}
                color="text-cyan-400"
              />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Marine Conditions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MarineConditionCard
          icon={Thermometer}
          label="Air Temperature"
          value={`${marineCurrent.temperature}${tempUnit}`}
          color="text-coral-400"
        />
        <MarineConditionCard
          icon={Wind}
          label="Wind Speed"
          value={`${marineCurrent.wind_speed} ${speedUnit}`}
          color="text-teal-400"
        />
        <MarineConditionCard
          icon={Navigation}
          label="Wind Direction"
          value={marineCurrent.wind_dir}
          color="text-amber-400"
        />
        <MarineConditionCard
          icon={Droplets}
          label="Humidity"
          value={`${marineCurrent.humidity}%`}
          color="text-blue-400"
        />
      </div>

      {/* Weather Description */}
      <GlassCard className="flex items-center gap-6" padding="lg">
        {marineCurrent.weather_icons?.[0] ? (
          <img 
            src={marineCurrent.weather_icons[0]} 
            alt={marineCurrent.weather_descriptions[0]}
            className="w-16 h-16 object-contain"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
            <Waves className="w-8 h-8 text-coral-400" />
          </div>
        )}
        <div>
          <p className="text-lg font-semibold text-offwhite">
            {marineCurrent.weather_descriptions?.[0] || 'Clear Conditions'}
          </p>
          <p className="text-slate-muted">
            Visibility: {marineCurrent.visibility} km
          </p>
        </div>
      </GlassCard>

      {/* Marine Safety Info */}
      <GlassCard className="border-l-4 border-l-coral-500" padding="lg">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249, 115, 22, 0.2)' }}>
            <Anchor className="w-5 h-5 text-coral-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-offwhite mb-2">Marine Conditions Summary</h3>
            <p className="text-slate-muted text-sm leading-relaxed">
              Current marine conditions show {marineCurrent.swell_height !== undefined && marineCurrent.swell_height < 1 
                ? 'calm seas with minimal swell, suitable for all water activities.' 
                : marineCurrent.swell_height !== undefined && marineCurrent.swell_height < 2 
                  ? 'moderate swell conditions. Caution advised for small vessels.' 
                  : 'rough sea conditions. Small craft advisories may be in effect.'}
              Water temperature is {marineCurrent.water_temperature !== undefined && marineCurrent.water_temperature < 20 
                ? 'cool' 
                : marineCurrent.water_temperature !== undefined && marineCurrent.water_temperature < 25 
                  ? 'moderate' 
                  : 'warm'} at {marineCurrent.water_temperature}{tempUnit}.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

interface MarineMetricProps {
  icon: typeof Waves;
  label: string;
  value: string;
  color: string;
}

const MarineMetric = ({ icon: Icon, label, value, color }: MarineMetricProps) => (
  <div className="glass-panel p-4 flex items-center gap-3">
    <Icon className={`w-5 h-5 ${color}`} />
    <div>
      <p className="text-xs text-slate-muted">{label}</p>
      <p className="text-lg font-semibold text-offwhite">{value}</p>
    </div>
  </div>
);

interface MarineConditionCardProps {
  icon: typeof Waves;
  label: string;
  value: string;
  color: string;
}

const MarineConditionCard = ({ icon: Icon, label, value, color }: MarineConditionCardProps) => (
  <GlassCard className="flex items-center gap-4" padding="md">
    <Icon className={`w-6 h-6 ${color}`} />
    <div>
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
    </div>
  </GlassCard>
);
