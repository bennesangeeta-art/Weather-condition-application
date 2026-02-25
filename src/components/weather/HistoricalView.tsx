import { useState } from 'react';
import { History, Calendar, Search } from 'lucide-react';
import { useHistorical } from '../../hooks/useWeather';
import { useWeatherStore } from '../../store/weatherStore';
import { GlassCard } from '../ui/GlassCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { getUnitSymbol, getSpeedUnit } from '../../utils/weatherIcons';
import { format, subDays } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const HistoricalView = () => {
  const { currentLocation, unit } = useWeatherStore();
  const [selectedDate, setSelectedDate] = useState(format(subDays(new Date(), 1), 'yyyy-MM-dd'));
  
  const { data, isLoading, error, refetch } = useHistorical(currentLocation, selectedDate, unit);

  // Generate last 30 days for quick select
  const quickDates = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), i + 1);
    return {
      value: format(date, 'yyyy-MM-dd'),
      label: format(date, 'MMM d'),
    };
  });

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading historical data..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error instanceof Error ? error.message : 'Failed to load historical data'} 
        onRetry={() => refetch()}
      />
    );
  }

  const historicalDay = data?.historical?.[selectedDate];
  const tempUnit = getUnitSymbol(unit);
  const speedUnit = getSpeedUnit(unit);

  // Hourly chart data
  const hourlyData = historicalDay?.hourly?.map((hour) => ({
    time: hour.time,
    temp: hour.temperature,
    humidity: hour.humidity,
  })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-offwhite flex items-center gap-2">
          <History className="w-6 h-6 text-coral-400" />
          Historical Weather
        </h2>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-slate-muted" />
          <input
            type="date"
            value={selectedDate}
            max={format(subDays(new Date(), 1), 'yyyy-MM-dd')}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="glass-input py-2"
          />
        </div>
      </div>

      {/* Quick Date Select */}
      <div className="glass-card p-4">
        <p className="text-sm text-slate-muted mb-3">Quick Select (Last 30 Days)</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {quickDates.slice(0, 14).map((date) => (
            <button
              key={date.value}
              onClick={() => setSelectedDate(date.value)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedDate === date.value
                  ? 'bg-coral-500 text-white'
                  : 'bg-white/5 text-slate-muted hover:bg-white/10 hover:text-offwhite'
              }`}
            >
              {date.label}
            </button>
          ))}
        </div>
      </div>

      {historicalDay ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard
              label="Max Temperature"
              value={`${historicalDay.maxtemp}${tempUnit}`}
              color="text-coral-400"
            />
            <SummaryCard
              label="Min Temperature"
              value={`${historicalDay.mintemp}${tempUnit}`}
              color="text-teal-400"
            />
            <SummaryCard
              label="Average"
              value={`${historicalDay.avgtemp}${tempUnit}`}
              color="text-blue-400"
            />
            <SummaryCard
              label="UV Index"
              value={historicalDay.uv_index.toString()}
              color="text-amber-400"
            />
          </div>

          {/* Hourly Temperature Chart */}
          <GlassCard padding="lg">
            <h3 className="text-lg font-semibold text-offwhite mb-4">
              Hourly Temperature - {format(parseISO(selectedDate), 'MMMM d, yyyy')}
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <XAxis 
                    dataKey="time" 
                    stroke="#94a3b8" 
                    fontSize={10}
                    tickLine={false}
                    interval={2}
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
                  <Bar dataKey="temp" radius={[4, 4, 0, 0]}>
                    {hourlyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.temp > 25 ? '#f97316' : entry.temp > 15 ? '#14b8a6' : '#3b82f6'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Hourly Data Table */}
          <GlassCard padding="lg">
            <h3 className="text-lg font-semibold text-offwhite mb-4">Hourly Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-muted">Time</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-muted">Temp</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-muted">Humidity</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-muted">Wind</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-muted">Precip</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalDay.hourly?.slice(0, 12).map((hour, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4 text-offwhite">{hour.time}</td>
                      <td className="py-3 px-4 text-offwhite">{hour.temperature}{tempUnit}</td>
                      <td className="py-3 px-4 text-offwhite">{hour.humidity}%</td>
                      <td className="py-3 px-4 text-offwhite">{hour.wind_speed} {speedUnit}</td>
                      <td className="py-3 px-4 text-offwhite">{hour.precip} mm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </>
      ) : (
        <GlassCard className="py-16 text-center">
          <Search className="w-12 h-12 text-slate-muted mx-auto mb-4" />
          <p className="text-slate-muted">Select a date to view historical data</p>
        </GlassCard>
      )}
    </div>
  );
};

interface SummaryCardProps {
  label: string;
  value: string;
  color: string;
}

const SummaryCard = ({ label, value, color }: SummaryCardProps) => (
  <GlassCard className="text-center" padding="lg">
    <p className="text-sm text-slate-muted mb-1">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </GlassCard>
);

// Helper function for date parsing
const parseISO = (dateString: string): Date => {
  return new Date(dateString);
};
