import { useState } from 'react';
import { Cloud, Settings, Bell, User, X, Moon, Sun, Globe, BellRing, BellOff } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { useWeatherStore } from '../../store/weatherStore';
import { cn } from '../../utils/cn';

export const Header = () => {
  const [activeModal, setActiveModal] = useState<'notifications' | 'settings' | 'profile' | null>(null);
  const { unit, setUnit } = useWeatherStore();

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <header className="sticky top-0 z-50 px-4 py-3">
        <GlassCard
          className="flex items-center justify-between"
          padding="sm"
          blur="lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)', boxShadow: '0 10px 25px rgba(249, 115, 22, 0.25)' }}>
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-offwhite">WeatherStack Pro</h1>
              <p className="text-xs" style={{ color: 'var(--color-slate-muted)' }}>Premium Weather Intelligence</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              className="glass-button p-2 relative"
              onClick={() => setActiveModal('notifications')}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              className="glass-button p-2"
              onClick={() => setActiveModal('settings')}
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              className="glass-button p-2"
              onClick={() => setActiveModal('profile')}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </GlassCard>
      </header>

      {/* Notifications Modal */}
      {activeModal === 'notifications' && (
        <Modal title="Notifications" onClose={closeModal}>
          <div className="space-y-3">
            <NotificationItem 
              icon={BellRing}
              title="Weather Alert"
              message="Heavy rain expected in your area tomorrow"
              time="2 hours ago"
              unread
            />
            <NotificationItem 
              icon={Sun}
              title="Daily Forecast"
              message="Sunny weather expected for the next 3 days"
              time="5 hours ago"
            />
            <NotificationItem 
              icon={Globe}
              title="Location Update"
              message="Weather data updated for your saved locations"
              time="1 day ago"
            />
          </div>
        </Modal>
      )}

      {/* Settings Modal */}
      {activeModal === 'settings' && (
        <Modal title="Settings" onClose={closeModal}>
          <div className="space-y-4">
            <SettingSection title="Units">
              <div className="flex gap-2">
                <button
                  onClick={() => setUnit('m')}
                  className={cn(
                    'flex-1 py-2 px-4 rounded-lg transition-all',
                    unit === 'm' 
                      ? 'bg-coral-500 text-white' 
                      : 'bg-white/5 text-offwhite hover:bg-white/10'
                  )}
                >
                  Metric (°C)
                </button>
                <button
                  onClick={() => setUnit('f')}
                  className={cn(
                    'flex-1 py-2 px-4 rounded-lg transition-all',
                    unit === 'f' 
                      ? 'bg-coral-500 text-white' 
                      : 'bg-white/5 text-offwhite hover:bg-white/10'
                  )}
                >
                  Imperial (°F)
                </button>
                <button
                  onClick={() => setUnit('s')}
                  className={cn(
                    'flex-1 py-2 px-4 rounded-lg transition-all',
                    unit === 's' 
                      ? 'bg-coral-500 text-white' 
                      : 'bg-white/5 text-offwhite hover:bg-white/10'
                  )}
                >
                  Scientific (K)
                </button>
              </div>
            </SettingSection>

            <SettingSection title="Appearance">
              <div className="flex items-center justify-between py-2">
                <span className="text-offwhite">Dark Mode</span>
                <button className="glass-button p-2">
                  <Moon className="w-4 h-4" />
                </button>
              </div>
            </SettingSection>

            <SettingSection title="Notifications">
              <div className="flex items-center justify-between py-2">
                <span className="text-offwhite">Weather Alerts</span>
                <button className="glass-button p-2">
                  <BellRing className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-offwhite">Daily Forecast</span>
                <button className="glass-button p-2">
                  <BellOff className="w-4 h-4" />
                </button>
              </div>
            </SettingSection>
          </div>
        </Modal>
      )}

      {/* Profile Modal */}
      {activeModal === 'profile' && (
        <Modal title="Profile" onClose={closeModal}>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-offwhite">Guest User</h3>
              <p className="text-sm" style={{ color: 'var(--color-slate-muted)' }}>Free Plan</p>
            </div>
            <div className="glass-card p-4 text-left">
              <h4 className="font-semibold text-offwhite mb-2">Account Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-slate-muted)' }}>Saved Locations</span>
                  <span className="text-offwhite">3</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-slate-muted)' }}>Recent Searches</span>
                  <span className="text-offwhite">10</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-slate-muted)' }}>Plan</span>
                  <span className="text-coral-400">Free</span>
                </div>
              </div>
            </div>
            <button className="glass-button-primary w-full">
              Upgrade to Pro
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ title, children, onClose }: ModalProps) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div 
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    />
    <GlassCard className="relative w-full max-w-md max-h-[80vh] overflow-y-auto" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-offwhite">{title}</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {children}
    </GlassCard>
  </div>
);

interface NotificationItemProps {
  icon: typeof Bell;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
}

const NotificationItem = ({ icon: Icon, title, message, time, unread }: NotificationItemProps) => (
  <div className={cn(
    'flex items-start gap-3 p-3 rounded-lg transition-colors',
    unread ? 'bg-white/5' : 'hover:bg-white/5'
  )}>
    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249, 115, 22, 0.2)' }}>
      <Icon className="w-5 h-5" style={{ color: '#fb923c' }} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <h4 className="font-medium text-offwhite">{title}</h4>
        {unread && <span className="w-2 h-2 bg-coral-500 rounded-full"></span>}
      </div>
      <p className="text-sm truncate" style={{ color: 'var(--color-slate-muted)' }}>{message}</p>
      <p className="text-xs mt-1" style={{ color: 'var(--color-slate-muted)' }}>{time}</p>
    </div>
  </div>
);

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingSection = ({ title, children }: SettingSectionProps) => (
  <div>
    <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--color-slate-muted)' }}>{title}</h3>
    <div className="glass-panel p-3">
      {children}
    </div>
  </div>
);
