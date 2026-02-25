import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LocationSearch } from './components/search/LocationSearch';
import { CurrentWeatherView } from './components/weather/CurrentWeather';
import { ForecastView } from './components/weather/ForecastView';
import { HistoricalView } from './components/weather/HistoricalView';
import { MarineView } from './components/weather/MarineView';
import { useWeatherStore } from './store/weatherStore';
import { Cloud, CalendarDays, History, Waves } from 'lucide-react';

const viewComponents = {
  current: CurrentWeatherView,
  forecast: ForecastView,
  historical: HistoricalView,
  marine: MarineView,
};

const viewIcons = {
  current: Cloud,
  forecast: CalendarDays,
  historical: History,
  marine: Waves,
};

const viewTitles = {
  current: 'Current Weather',
  forecast: 'Weather Forecast',
  historical: 'Historical Data',
  marine: 'Marine Weather',
};

function App() {
  const { view } = useWeatherStore();
  const CurrentView = viewComponents[view];
  const ViewIcon = viewIcons[view];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 px-4 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Search Section */}
            <section className="py-6">
              <LocationSearch />
            </section>

            {/* Mobile Navigation */}
            <div className="lg:hidden glass-card p-2 overflow-x-auto">
              <div className="flex gap-2">
                {(Object.keys(viewComponents) as Array<keyof typeof viewComponents>).map((viewKey) => {
                  const Icon = viewIcons[viewKey];
                  return (
                    <button
                      key={viewKey}
                      onClick={() => useWeatherStore.getState().setView(viewKey)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                        view === viewKey
                          ? 'bg-coral-500 text-white'
                          : 'bg-white/5 text-slate-muted hover:bg-white/10 hover:text-offwhite'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{viewTitles[viewKey]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* View Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(249, 115, 22, 0.2)' }}>
                <ViewIcon className="w-5 h-5 text-coral-400" />
              </div>
              <h2 className="text-2xl font-bold text-offwhite">{viewTitles[view]}</h2>
            </div>

            {/* Main Content */}
            <CurrentView />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
